import { Collections, getDb } from "@/lib/db";
import { quotes as localQuotes } from "@/quotes"; // Eski lokal verilerinin olduğu dosya
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await getDb();
    const col = db.collection(Collections.Quotes);

    // Çift veri eklememek için önce veritabanı boş mu kontrol edelim
    const count = await col.countDocuments();
    if (count > 0) {
      return NextResponse.json({
        message: "There are already quotes in the database. Seeding skipped to avoid duplicates.",
        currentCount: count
      });
    }

    // Eski lokal sözleri alıp MongoDB formatına dönüştürüyoruz.
    // İleride "düzenleme/silme" yetki kontrolü hataya düşmesin diye, bu eski sözlerin sahibini (createdBy) "system" yapıyoruz.
    const seedData = localQuotes.map((q) => ({
      quote: q.quote,
      author: q.author,
      category: q.category || "Uncategorized",
      likeCount: q.likeCount || 0,
      likedBy: "likedBy" in q ? q.likedBy : [],
      createdBy: "system", // Sistem tarafından aktarıldığını belirtiyoruz
      createdAt: new Date(),
      updatedAt: new Date(),
      adminApproved: false,
    }));

    // Programatik insert işlemi (insertMany: tüm diziyi tek seferde MongoDB'ye fırlatır)
    const result = await col.insertMany(seedData);

    return NextResponse.json({
      success: true,
      message: "Quotes have been seeded successfully.",
      insertedCount: result.insertedCount,
    });

  } catch (error) {
    console.error("Error occurred while seeding quotes:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
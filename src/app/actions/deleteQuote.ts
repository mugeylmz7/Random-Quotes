"use server";

import { auth0 } from "@/lib/auth0";
import { Collections, getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function deleteQuote(quoteId: string) {
  // 1. Kullanıcının giriş yapıp yapmadığını kontrol et
  const session = await auth0.getSession();
  const user = session?.user;

  if (!session || !user) {
    throw new Error("You must be logged in to delete a quote.");
  }

  const db = await getDb();
  const col = db.collection(Collections.Quotes);

  // 2. Önce silinmek istenen sözü veritabanından buluyoruz
  const quote = await col.findOne({ _id: new ObjectId(quoteId) });

  if (!quote) {
    throw new Error("Quote not found!");
  }

  // 3. YETKİLENDİRME (AUTHORIZATION) KONTROLÜ: Sözün sahibi mi?
  // Veritabanındaki sözün sahibi ile giriş yapan kullanıcının ID'si aynı mı?
  if (quote.createdBy !== user.sub) {
    throw new Error("Unauthorized! You can only delete your own quotes.");
  }

  // 4. Her şey güvenliyse sözü kalıcı olarak sil
  await col.deleteOne({ _id: new ObjectId(quoteId) });

  // 5. Arayüzdeki verileri sayfayı yenilemeden anında güncelle!
  revalidatePath("/");

  return { success: true };
}
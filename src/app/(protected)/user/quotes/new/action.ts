"use server";

import { auth0 } from "@/lib/auth0";
import { Collections, getDb } from "@/lib/db";
import { quotes } from "@/quotes";
import { AddNewQuoteState, newQuoteSchema } from "@/types/quotes";
import z from "zod";
import { revalidatePath } from "next/cache";

export async function addNewQuote(
  currentState: AddNewQuoteState,
  formData: FormData,
): Promise<AddNewQuoteState> {
  const session = await auth0.getSession();
  const user = session?.user;
  console.log("user", user);

  if (!session || !user) {
    return {
      success: false,
      message: "Please log in to add a new quote.",
    };
  }

  // Verileri alıyoruz
  const rawData = {
    author: formData.get("author")?.toString() ?? "",
    quote: formData.get("quote")?.toString() ?? "",
    category: formData.get("category")?.toString() ?? "",
  };

  const validationOutput = newQuoteSchema.safeParse(rawData);

  if (!validationOutput.success) {
    const validationErrors = z.flattenError(validationOutput.error);
    console.log("validationErrors", validationErrors);

    return {
      success: false,
      message: "Validation failed. Please correct the errors and try again.",
      errors: validationErrors as AddNewQuoteState["errors"],
      data: rawData,
    };
  } else {
    const db = await getDb();
    const col = db.collection(Collections.Quotes);
    // --- GÜVENLİK KONTROLÜ ---
    // Kullanıcının yazdığı sözü (büyük/küçük harf duyarlılığıyla) veritabanında arıyoruz
    const existingQuote = await col.findOne({
      quote: validationOutput.data.quote,
    });

    // Eğer existingQuote dolu dönerse (yani aynısından varsa) işlemi durdur ve hata mesajı yolla
    if (existingQuote) {
      return {
        success: false,
        message:
          "This quote already exists in the database. Please add a different one.",
      };
    }

    // Eğer aynı söz yoksa, normal kayıt işlemine devam et
    const now = new Date().toISOString();
    const newQuote = {
      quote: validationOutput.data.quote,
      author: validationOutput.data.author,
      category: validationOutput.data.category,
      createdBy: user.sub,
      createdAt: now,
      updatedAt: now,
      adminApproved: true,
      likedBy: [],
    };

    const newDoc = await col.insertOne(newQuote);
    console.log("Inserted quote with ID:", newDoc.insertedId);

    // Ana sayfanın arka plan önbelleğini temizle
    revalidatePath("/");

    return {
      success: true,
      message: "Quote added successfully!",
    };
  }
}

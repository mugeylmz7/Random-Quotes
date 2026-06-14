"use server";

import { auth0 } from "@/lib/auth0";
import { Collections, getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { NewQuoteInput } from "@/types/quotes";

export async function editQuote(quoteId: string, updatedQuote: NewQuoteInput) {
  const session = await auth0.getSession();
  const user = session?.user;

  if (!session || !user) {
    throw new Error("You must be logged in to edit a quote.");
  }

  const db = await getDb();
  const col = db.collection(Collections.Quotes);

  // 1. Sözü bul
  const quote = await col.findOne({ _id: new ObjectId(quoteId) });

  if (!quote) {
    throw new Error("Quote not found!");
  }

  // 2. YETKİLENDİRME: Sözü değiştirmek isteyen kişi, sözün gerçek sahibi mi?
  if (quote.createdBy !== user.sub) {
    throw new Error("Unauthorized! You can only edit your own quotes.");
  }

  // 3. Her şey güvenliyse veritabanındaki verileri güncelle
  await col.updateOne(
    { _id: new ObjectId(quoteId) },
    { 
      $set: { 
        quote: updatedQuote.quote,
        author: updatedQuote.author,
        category: updatedQuote.category,
        updatedAt: new Date().toISOString()
      } 
    }
  );

  // 4. Ana sayfayı yenile ki yeni veriler anında ekrana yansısın
  revalidatePath("/");
  
  return { success: true };
}
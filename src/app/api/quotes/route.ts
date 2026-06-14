import { Collections, getDb } from "@/lib/db";
import { Quote } from "@/types/quotes";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Next.js'e "Bu API'yi asla önbelleğe alma, her seferinde canlı çek" diyoruz.

export async function GET() {
  const db = await getDb();
  const col = db.collection<Quote>(Collections.Quotes);
  const query = { adminApproved: false };
  const quotes = await col.find(query).toArray();


  return NextResponse.json(quotes);
}

"use client";

import { useContext } from "react";
import { QuotesContext } from "@/app/QuotesContext";
import { QuoteCard } from "./QuoteCardNew";

export default function Home() {
  const {
    quotes,
    quoteIndex,
    handleLikeQuote,
    handleUnlikeQuote,
    handleNextQuote,
  } = useContext(QuotesContext);

  // Veri güvenliği: Eğer quotes henüz yüklenmediyse hata vermesini engelle
  if (!quotes || quotes.length === 0) return <p>Loading...</p>;

  const currentQuote = quotes[quoteIndex];

  return (
    <main className="dark:bg-slate-900 min-h-screen flex items-center justify-center p-4">
      <QuoteCard
        handleNextQuote={handleNextQuote}
        handleUnlikeQuote={handleUnlikeQuote}
        handleLikeQuote={handleLikeQuote}
        currentQuote={currentQuote}
      />
    </main>
  );
}
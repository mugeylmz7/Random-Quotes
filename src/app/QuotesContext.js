"use client";

import { createContext, useState } from "react";
import { quotes as initialQuotes } from "@/quotes";
import { getRandomNumber } from "@/utils/helper-functions";

// 1. Boş bir depo oluşturup bunu diğer dosyalarda kullanabilmek için 'export' etmeliyiz.
export const QuotesContext = createContext();

// 2. Depoya verileri koyacak ve dağıtacak Provider (Sağlayıcı) bileşenimiz
export function QuotesProvider({ children }) {
  // --- VERİLER ---
  const [quotes, setQuotes] = useState(initialQuotes); // 1. Sözlerin listesi ve şu an gösterilen sözün indexi için state'ler oluşturuyoruz.
  const [quoteIndex, setQuoteIndex] = useState(0); // 2. Aktif sözün sırası (Başlangıç değeri 0)
  const [likedQuotes, setLikedQuotes] = useState([]); // 3. Beğenilen sözler listesi buraya gelecek

  // --- FONKSİYONLAR ---
  function handleLikeQuote(quote) {
    // 1. Beğenilen sözü likedQuotes listesine ekliyoruz
    const isAlreadyLiked = likedQuotes.find((q) => q.id === quote.id);
    
    if (!isAlreadyLiked) {
      // Favorilere ekle
      setLikedQuotes([...likedQuotes, quote]);
      console.log("The quote was liked!", quote);

      // Ana quotes listesindeki likeCount'u artır
      setQuotes(prevQuotes => 
        prevQuotes.map((q) => 
          // Sadece ID'si eşleşen sözün sayısını artır, diğerlerini olduğu gibi bırak
          q.id === quote.id ? {...q, likeCount: q.likeCount + 1} : q
        )
      );
    }
  }

  // Beğenmekten vazgeçme
  function handleUnlikeQuote(quote) {
  // 1. Favori listesinden çıkar
  setLikedQuotes(likedQuotes.filter((q) => q.id !== quote.id));

  // 2. Ana listedeki beğeni sayısını 1 azalt
  setQuotes(prevQuotes => 
    prevQuotes.map((q) => 
      q.id === quote.id ? { ...q, likeCount: Math.max(0, q.likeCount - 1) } : q
    )
  );
}

  // Sıradaki söze geçme
  function handleNextQuote() {
    const nextIndex = getRandomNumber(0, quotes.length - 1);
    setQuoteIndex(nextIndex);
  }

  return (
    // Oluşturduğumuz state'leri diğer sayfalara göndermek için value objesinin içine koyuyoruz
    <QuotesContext.Provider
      value={{
        quotes,
        quoteIndex,
        likedQuotes,
        handleLikeQuote,
        handleUnlikeQuote,
        handleNextQuote,
      }}
    >
      {/* children, bu depoyla sarmalayacağımız diğer tüm sayfaları temsil eder */}
      {children}
    </QuotesContext.Provider>
  );
}

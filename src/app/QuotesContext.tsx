"use client";

import { createContext, useState, ReactNode } from "react";
import { quotes as initialQuotes } from "@/quotes";
import { getRandomNumber } from "@/utils/helper-functions";

export interface Quote {
  id: number;
  quote: string;
  author: string;
  likeCount: number;
  isLiked?: boolean;
}

interface QuotesContextType {
  quotes: Quote[];
  quoteIndex: number;
  likedQuotes: Quote[];
  handleLikeQuote: (quote: Quote) => void;
  handleUnlikeQuote: (quote: Quote) => void;
  handleNextQuote: () => void;
}



export const QuotesContext = createContext<QuotesContextType>({} as QuotesContextType);

interface QuotesProviderProps {
  children: ReactNode;
}

// Depoya verileri koyacak ve dağıtacak Provider (Sağlayıcı) bileşenimiz
export function QuotesProvider({ children }: QuotesProviderProps) {
  // --- VERİLER ---
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes); // 1. Sözlerin listesi ve şu an gösterilen sözün indexi için state'ler oluşturuyoruz.
  const [quoteIndex, setQuoteIndex] = useState<number>(0); // 2. Aktif sözün sırası (Başlangıç değeri 0)
  const [likedQuotes, setLikedQuotes] = useState<Quote[]>([]); // 3. Beğenilen sözler listesi buraya gelecek

  // --- FONKSİYONLAR ---
  function handleLikeQuote(quote: Quote) {
    // Beğenilen sözü likedQuotes listesine ekliyoruz
    const isAlreadyLiked = likedQuotes.find((q) => q.id === quote.id);

    if (!isAlreadyLiked) {
      setLikedQuotes([...likedQuotes, { ...quote, isLiked: true }]);

      // Ana quotes listesindeki likeCount'u artır
      setQuotes((prevQuotes) =>
        prevQuotes.map((q) =>
          // Sadece ID'si eşleşen sözün sayısını artır, diğerlerini olduğu gibi bırak
          q.id === quote.id
            ? { ...q, likeCount: q.likeCount + 1, isLiked: true } 
            : q,
        ),
      );
    }
  }


  function handleUnlikeQuote(quote: Quote) {
    // 1. Favori listesinden çıkar
    setLikedQuotes(likedQuotes.filter((q) => q.id !== quote.id));

    // 2. Ana listedeki beğeni sayısını 1 azalt
    setQuotes((prevQuotes) =>
      prevQuotes.map((q) =>
        q.id === quote.id
          ? { ...q, likeCount: Math.max(0, q.likeCount - 1), isLiked: false } // isLiked'ı false yaptık
          : q,
      ),
    );
  }


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
"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { quotes as initialQuotes } from "@/quotes";
import { getRandomNumber } from "@/utils/helper-functions";
import { useUser } from "@auth0/nextjs-auth0/client";

export interface Quote {
  id: number;
  quote: string;
  author: string;
  likeCount: number;
  isLiked?: boolean;
  likedBy?: string[]; // Beğenen kullanıcıların ID'lerini tutacak dizi (isteğe bağlı)
}

interface QuotesContextType {
  quotes: Quote[];
  quoteIndex: number;
  likedQuotes: Quote[];
  handleLikeQuote: (quote: Quote) => void;
  handleUnlikeQuote: (quote: Quote) => void;
  handleNextQuote: () => void;
}

export const QuotesContext = createContext<QuotesContextType>(
  {} as QuotesContextType,
);

interface QuotesProviderProps {
  children: ReactNode;
}

// Depoya verileri koyacak ve dağıtacak Provider (Sağlayıcı) bileşenimiz
export function QuotesProvider({ children }: QuotesProviderProps) {
  // --- VERİLER ---

  const [quotes, setQuotes] = useState<Quote[]>(() =>
    initialQuotes.map((q) => ({ ...q, isLiked: false })),
  );

  const [quoteIndex, setQuoteIndex] = useState<number>(0); // Aktif sözün sırası (Başlangıç değeri 0)

  const [likedQuotes, setLikedQuotes] = useState<Quote[]>(() => {
    //  Beğenilen sözler listesi için state oluşturuyoruz ve başlangıçta localStorage'dan veriyi çekiyoruz
    const savedLikedQuotes = localStorage.getItem("likedQuotes");
    //  Eğer veri varsa, metni tekrar objeye (parse) dönüştürüp döndürüyoruz, yoksa boş bir dizi döndürüyoruz:
    return savedLikedQuotes ? JSON.parse(savedLikedQuotes) : [];
  });

  const { user } = useUser();

  useEffect(() => {
    localStorage.setItem("likedQuotes", JSON.stringify(likedQuotes));
  }, [likedQuotes]); // likedQuotes her değiştiğinde güncellenmiş listeyi localStorage'a kaydediyoruz

  // ANA LİSTEYİ SENKRONİZE ETME: likedQuotes değiştiğinde, ana quotes listesindeki ilgili sözün isLiked durumunu güncelliyoruz. Böylece hangi sözlerin beğenildiği her zaman doğru şekilde gösterilir.
  useEffect(() => {
    setQuotes((prevQuotes) =>
      prevQuotes.map((q) => {
        const isAlreadyLiked = likedQuotes.some((l) => l.id === q.id);
        return {
          ...q,
          isLiked: isAlreadyLiked,
          // Eğer beğenilmişse en az 1 göster, değilse 0 (veya orijinal sayı)
          likeCount: isAlreadyLiked
            ? q.likeCount > 0
              ? q.likeCount
              : 1
            : q.likeCount,
        };
      }),
    );
  }, [likedQuotes]); // likedQuotes her değiştiğinde ana quotes listesini güncelleyerek hangi sözlerin beğenildiğini işaretliyoruz

  // --- FONKSİYONLAR ---
  function handleLikeQuote(quote: Quote) {
    // Beğenilen sözü likedQuotes listesine ekliyoruz
    const isAlreadyLiked = likedQuotes.find((q) => q.id === quote.id);

    if (!isAlreadyLiked) {
      const updatedLikedBy = [...(quote.likedBy || []), user?.sub].filter(
        Boolean,
      ) as string[];
      setLikedQuotes([
        ...likedQuotes,
        { ...quote, isLiked: true, likedBy: updatedLikedBy },
      ]);

      // Ana quotes listesindeki likeCount'u artır
      setQuotes((prevQuotes) =>
        prevQuotes.map((q) =>
          // Sadece ID'si eşleşen sözün sayısını artır, diğerlerini olduğu gibi bırak
          q.id === quote.id
            ? {
                ...q,
                likeCount: q.likeCount + 1,
                isLiked: true,
                likedBy: [...(q.likedBy || []), user?.sub],
              }
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
          ? {
              ...q,
              likeCount: Math.max(0, q.likeCount - 1),
              isLiked: false,
              likedBy: q.likedBy?.filter((id) => id !== user?.sub),
            }
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

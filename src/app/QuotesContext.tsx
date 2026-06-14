"use client";

import { createContext, useState, useEffect, ReactNode, useMemo } from "react";
import { getRandomNumber } from "@/utils/helper-functions";
import { useUser } from "@auth0/nextjs-auth0/client";

export interface Quote {
  createdBy: string;
  _id: any; // MongoDB'nin kendi atadığı benzersiz ID
  category: string;
  id: number;
  quote: string;
  author: string;
  likedBy?: string[]; // Beğenen kullanıcıların ID'lerini tutacak dizi (isteğe bağlı)
}

interface QuotesContextType {
  quotes: Quote[];
  quoteIndex: number;
  likedQuotes: Quote[];
  isLoading: boolean;
  error: string | null;
  handleLikeQuote: (quote: Quote) => void;
  handleUnlikeQuote: (quote: Quote) => void;
  handleNextQuote: () => void;
  fetchData: () => Promise<void>;
}

export const QuotesContext = createContext<QuotesContextType>(
  {} as QuotesContextType,
);

interface QuotesProviderProps {
  children: ReactNode;
}

// Depoya verileri koyacak ve dağıtacak Provider (Sağlayıcı) bileşenimiz
export function QuotesProvider({ children }: QuotesProviderProps) {
  const { user } = useUser();

  // --- VERİLER ---

  const [quotes, setQuotes] = useState<Quote[]>([]) // Sözlerin kendisi

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quoteIndex, setQuoteIndex] = useState<number>(0); // Aktif sözün sırası (Başlangıç değeri 0)

  const likedQuotes = useMemo(() => {
    return quotes.filter((q) => q.likedBy?.includes(user?.sub as string));
  }, [quotes, user?.sub]);

  async function fetchData() {
    try {
      setIsLoading(true);
      const response = await fetch("/api/quotes");
      if (!response.ok) {
        throw new Error("Failed to fetch quotes");
      }
      const quotesData = await response.json();
      setQuotes(quotesData);
      setQuoteIndex(0); // Yeni veriler geldiğinde ilk söze dön
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch quotes");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // Sayfa ilk açıldığında bu fonksiyonu çalıştır
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- FONKSİYONLAR ---
  function handleLikeQuote(quote: Quote) {
    if (!user?.sub) return;

    const alreadyLikedByCurrentUser = quote.likedBy?.includes(user.sub);
    if (alreadyLikedByCurrentUser) return;

    setQuotes((prevQuotes) =>
      prevQuotes.map((q) =>
        q._id === quote._id
          ? {
              ...q,
              likedBy: [...(q.likedBy || []), user.sub as string],
            }
          : q,
      ),
    );
  }

  function handleUnlikeQuote(quote: Quote) {
    if (!user?.sub) return;

    // 2. Ana listedeki beğeni sayısını 1 azalt
    setQuotes((prevQuotes) =>
      prevQuotes.map((q) =>
        q._id === quote._id
          ? {
              ...q,
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
        isLoading,
        error,
        handleLikeQuote,
        handleUnlikeQuote,
        handleNextQuote,
        fetchData
      }}
    >
      {/* children, bu depoyla sarmalayacağımız diğer tüm sayfaları temsil eder */}
      {children}
    </QuotesContext.Provider>
  );
}


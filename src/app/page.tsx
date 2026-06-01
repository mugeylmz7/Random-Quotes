"use client";

import { useContext, useState } from "react";
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

  // Kategori seçimi ve filtrelenmiş liste için kendi yerel state'lerimiz
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredIndex, setFilteredIndex] = useState(0);

  // Veri güvenliği: Eğer quotes henüz yüklenmediyse hata vermesini engelle
  if (!quotes || quotes.length === 0) return <p>Loading...</p>; 

  // Sözlerin içinden benzersiz (unique) kategorileri bulup dinamik bir menü hazırlıyoruz
  const categories = [
    "All",
    ...Array.from(new Set(quotes.map((q) => q.category).filter(Boolean))),
  ];

  // Hangi kategorideysek sözleri ona göre filtrele
  const filteredQuotes =
    selectedCategory === "All"
      ? quotes
      : quotes.filter((q) => q.category === selectedCategory);

  // Güvenli Quote Seçimi: All seçiliyse Context'i, filtreliyse yerel indeksi kullan
  const currentQuote =
    selectedCategory === "All"
      ? quotes[quoteIndex]
      : filteredQuotes[filteredIndex];

  // Next (Sıradaki Söz) butonuna basılınca ne olacak?
  const onNextClick = () => {
    if (selectedCategory === "All") {
      handleNextQuote(); // Filtre yoksa Context'teki orijinal fonksiyonu çalıştır
    } else {
      // Filtre varsa, filtrelenmiş dizide başa sararak ilerle
      setFilteredIndex((prev) => (prev + 1) % filteredQuotes.length);
    }
  };

  return (
    <main className="dark:bg-slate-900 min-h-screen flex items-center justify-center p-4">
      {/* SİHİRLİ DÜZELTME: Hem Kategorileri hem de Kartı tek bir dikey kapsayıcı div'e alıyoruz */}
      <div className="w-full max-w-2xl mx-auto space-y-8 flex flex-col items-center">
        {/* KATEGORİ FİLTRE BUTONLARI */}
        <div className="flex flex-wrap gap-2 justify-center w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setFilteredIndex(0); // Kategori değiştiğinde indeksi başa sar
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 shadow-sm ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 scale-105"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 dark:bg-slate-950 dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* SÖZ KARTI VEYA BOŞ DURUM UYARISI */}
        {filteredQuotes.length > 0 ? (
          <QuoteCard
            handleNextQuote={onNextClick}
            handleUnlikeQuote={handleUnlikeQuote}
            handleLikeQuote={handleLikeQuote}
            currentQuote={currentQuote}
          />
        ) : (
          <p className="text-slate-500 dark:text-slate-400">
            No quotes available for the selected category.
          </p>
        )}
      </div>
    </main>
  );
}

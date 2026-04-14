'use client';

import { H3 } from '@/components/typography/H3';
import { Button } from '@/components/Button';
import { useContext } from 'react';
import { QuotesContext } from '@/app/QuotesContext';

export default function Home() {
  const { quotes, quoteIndex, handleLikeQuote, handleUnlikeQuote, likedQuotes, handleNextQuote } = useContext(QuotesContext);
  
  // 1. Veri güvenliği: Eğer quotes henüz yüklenmediyse hata vermesini engelle
  if (!quotes || quotes.length === 0) return <p>Loading...</p>;

  const currentQuote = quotes[quoteIndex];
  
  // 2. Beğeni durumunu kontrol et
  const isLiked = likedQuotes.some(q => q.id === currentQuote.id);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-200 p-4">
      <section className="flex flex-col rounded-md bg-slate-50/50 p-8 shadow-md max-w-md w-full">
        
        {/* Beğeni Bölümü */}
        <div className='flex items-center self-end gap-2 mb-4'>
          <span className="text-sm font-bold text-slate-600">
            {currentQuote.likeCount}
          </span>
          <Button 
            variant={'icon'} 
            onClick={() => isLiked ? handleUnlikeQuote(currentQuote) : handleLikeQuote(currentQuote)}
            className="transition-transform active:scale-125"
          >
            {isLiked ? '❤️' : '🤍'}
          </Button>
        </div>
        
        {/* Söz ve Yazar Bölümü */}
        <div className="min-h-[120px] flex flex-col justify-center">
          <H3 element='p' className="italic text-center">"{currentQuote.quote}"</H3>
          <span className='text-md font-semibold text-slate-900 self-end mt-4'>
            — {currentQuote.author}
          </span>
        </div>
        
        {/* Navigasyon */}
        <div className='flex justify-center mt-8'>
          <Button variant={'primary'} onClick={handleNextQuote} className="w-full">
            Next Quote
          </Button>
        </div>

      </section>
    </main>
  );
}
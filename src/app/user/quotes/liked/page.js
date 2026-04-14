'use client';

import { useContext } from 'react';
import { QuotesContext } from '@/app/QuotesContext';
import { H3 } from '@/components/typography/H3';
import { Button } from '@/components/Button';

export default function LikedQuotesPage() {
  const { likedQuotes, handleUnlikeQuote } = useContext(QuotesContext);

  return (
    <main className="min-h-screen bg-slate-200 p-8">
      <section className="max-w-2xl mx-auto">
        <H3 element='h1' className='mb-8 text-center text-slate-800 text-3xl'>
          My Liked Quotes ❤️
        </H3>

        <div className='flex flex-col gap-6 w-full mt-4'>
          {likedQuotes.length === 0 ? (
            <div className="bg-white/50 p-10 rounded-lg text-center shadow-sm">
              <p className='text-slate-600 text-lg italic'>
                You haven't liked any quotes yet. Go back and find some inspiration!
              </p>
            </div>
          ) : (
            likedQuotes.map((quote) => (
              <section 
                key={quote.id} 
                className="flex flex-row items-center justify-between gap-4 rounded-xl bg-white p-6 shadow-md border-l-4 border-red-400 transition-all hover:shadow-lg"
              >
                {/* Sol Taraf: Söz ve Yazar */}
                <div className="flex flex-col flex-1">
                  <p className="text-lg text-slate-800 font-medium italic mb-2">
                    "{quote.quote}"
                  </p>
                  <span className='text-sm font-semibold text-slate-500 uppercase tracking-wider'>
                    — {quote.author}
                  </span>
                </div>

                {/* Sağ Taraf: Kaldırma Butonu */}
                <div className="flex-shrink-0">
                  <Button 
                    variant={'icon'} 
                    onClick={() => handleUnlikeQuote(quote)}
                    className="hover:bg-red-50 p-2 rounded-full transition-colors"
                    title="Remove from favorites"
                  >
                    <span className="text-2xl">💔</span>
                  </Button>
                </div>
              </section>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
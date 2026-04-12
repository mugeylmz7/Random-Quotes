'use client';

import {quotes as initialQuotes} from '@/quotes';
import {useState} from 'react';
import {H3} from '@/components/typography/H3';
import {Button} from '@/components/Button';
import {getRandomNumber} from '@/utils/helper-functions';

export default function Home() {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const {quote, author, likeCount} = quotes[quoteIndex];

  function handleClick() {
    const nextQuoteIndex = getRandomNumber (0, initialQuotes.length -1);
    setQuoteIndex(nextQuoteIndex);
  }

  function handleLike() {
    const updatedQuotes = quotes.map((q, index) => {
      if (index === quoteIndex) {
        return {...q, likeCount: q.likeCount +1};
      } 
        return q;
      } );
    setQuotes(updatedQuotes);
  }

  return (
    //JSX
      <main className="min-h-screen flex items-center justify-center bg-slate-200">
        <section className="flex flex-col rounded-md bg-slate-50/50 p-8 shadow-md max-w-md w-full">
          <H3 element='p'>{quote}</H3>
          <span className='text-md font-semibold text-slate-900 self end'>-{author}</span>
          <div className='flex flex-row justify-between mt-8'>
          <Button variant={'primary'} onClick={handleLike}>Like ({likeCount}) </Button>
         
            <Button variant = {'primary'} onClick = {handleClick}>
            Next Quote
            </Button>
          </div>
        </section>
      </main>
  );
}



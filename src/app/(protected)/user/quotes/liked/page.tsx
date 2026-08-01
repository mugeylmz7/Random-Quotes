"use client";

import { useContext } from "react";
import { QuotesContext } from "@/components/QuotesContext";
import { Button } from "@/components/Button";
import { useTheme } from "next-themes";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function LikedQuotesPage() {
  const { likedQuotes, handleUnlikeQuote } = useContext(QuotesContext);
  const { theme, resolvedTheme } = useTheme();
  const { user } = useUser();

  // Mevcut temanın karanlık olup olmadığını net olarak anlıyoruz
  const isDark = theme === "dark" || resolvedTheme === "dark";

  const myLikedQuotes = likedQuotes.filter((quote) =>
    quote.likedBy?.includes(user?.sub),
  );

  return (
    <main className="min-h-[calc(100vh-5.5rem)] p-8 bg-background text-foreground transition-colors" suppressHydrationWarning>
      <section className="max-w-2xl mx-auto">
        <h1 className="mb-8 text-center text-3xl font-bold tracking-tight blue-950 dark:color-blue-50">
          My Liked Quotes ❤️
        </h1>

        <div className="flex flex-col gap-6 w-full mt-4">
          {myLikedQuotes.length === 0 ? (
            <div className="p-10 rounded-lg text-center shadow-sm border border-dashed bg-white dark:bg-slate-900 border-slate-700 dark:border-slate-300">
              <p className="text-lg italic font-medium text-gray-700 dark:text-gray-200">
                You haven't liked any quotes yet. Go back and find some
                inspiration!
              </p>
            </div>
          ) : (
            myLikedQuotes.map((quote) => (
              <section
                key={quote.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl p-4 sm:p-6 shadow-md border-l-4 border-red-400 transition-all bg-white dark:bg-slate-900 border-slate-700 dark:border-slate-300"
              >
                <div className="flex flex-col flex-1">
                  <p className="text-lg font-medium italic mb-2 text-gray-700 dark:text-gray-200">
                    "{quote.quote}"
                  </p>
                  <span className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200">
                    — {quote.author}
                  </span>
                </div>

                <div className="flex-shrink-0">
                  <Button
                    variant={"icon"}
                    onClick={() => handleUnlikeQuote(quote)}
                    className="p-2 rounded-full transition-colors focus:ring-2 focus:ring-red-400 outline-none bg-white dark:bg-slate-900 border-slate-700 dark:border-slate-300"
                    aria-label={`Remove quote by ${quote.author} from favorites`}
                    title="Remove from favorites"
                  >
                    <span className="text-2xl" aria-hidden="true">
                      💔
                    </span>
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

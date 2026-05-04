"use client";

import { useContext } from "react";
import { QuotesContext } from "@/app/QuotesContext";
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
    <main className="min-h-screen p-8" suppressHydrationWarning>
      <section className="max-w-2xl mx-auto">
        <h1
          className="mb-8 text-center text-3xl font-bold tracking-tight"
          style={{ color: isDark ? "#ffffff" : "#0f172a" }}
        >
          My Liked Quotes ❤️
        </h1>

        <div className="flex flex-col gap-6 w-full mt-4">
          {myLikedQuotes.length === 0 ? (
            <div
              className="p-10 rounded-lg text-center shadow-sm border border-dashed"
              style={{
                backgroundColor: isDark ? "#1e293b" : "#f1f5f9",
                borderColor: isDark ? "#334155" : "#cbd5e1",
              }}
            >
              <p
                style={{ color: isDark ? "#f8fafc" : "#334155" }}
                className="text-lg italic font-medium"
              >
                You haven't liked any quotes yet. Go back and find some
                inspiration!
              </p>
            </div>
          ) : (
            myLikedQuotes.map((quote) => (
              <section
                key={quote.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl p-4 sm:p-6 shadow-md border-l-4 border-red-400 transition-all"
                style={{ backgroundColor: isDark ? "#1e293b" : "#ffffff" }}
              >
                <div className="flex flex-col flex-1">
                  <p
                    className="text-lg font-medium italic mb-2"
                    style={{ color: isDark ? "#ffffff" : "#1e293b" }}
                  >
                    "{quote.quote}"
                  </p>
                  <span
                    className="text-sm font-semibold uppercase tracking-wider"
                    style={{ color: isDark ? "#e2e8f0" : "#475569" }}
                  >
                    — {quote.author}
                  </span>
                </div>

                <div className="flex-shrink-0">
                  <Button
                    variant={"icon"}
                    onClick={() => handleUnlikeQuote(quote)}
                    className="p-2 rounded-full transition-colors focus:ring-2 focus:ring-red-400 outline-none"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(239, 68, 68, 0.1)"
                        : "transparent",
                    }}
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

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { H3 } from "@/components/typography/H3";
import { Quote } from "@/app/QuotesContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Heart } from "lucide-react";

interface QuoteCardProps {
  currentQuote: Quote;
  handleLikeQuote: (quote: Quote) => void;
  handleUnlikeQuote: (quote: Quote) => void;
  handleNextQuote: () => void;
}

export function QuoteCard({
  handleNextQuote,
  handleUnlikeQuote,
  handleLikeQuote,
  currentQuote,
}: QuoteCardProps) {
  const { user } = useUser();

  const isLiked = currentQuote.likedBy?.includes(user?.sub as string);

  return (
    <Card
      size="lg"
      className="bg-white border border-slate-200 dark:border-slate-800 p-6 rounded-lg shadow-sm"
    >
      <CardContent className="flex flex-col p-6">
        <div className="flex items-center justify-between w-full mb-4">
          {/* SOL TARAF: Kategori Rozeti */}
          <span className="px-3 py-1 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 text-xs font-semibold rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
            {currentQuote.category || "Uncategorized"}
          </span>

          {/* SAĞ TARAF: Beğenme Butonu */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-600">
              {currentQuote.likeCount}
            </span>
            <Button
              variant={"ghost"}
              size="icon"
              disabled={!user}
              onClick={() =>
                isLiked
                  ? handleUnlikeQuote(currentQuote)
                  : handleLikeQuote(currentQuote)
              }
              className="transition-transform active:scale-125"
            >
              {isLiked ? (
                <Heart className="fill-red-500 text-red-500" />
              ) : (
                <Heart className="text-slate-400" />
              )}
            </Button>
          </div>
        </div>

        {/* ORTA KISIM: Söz ve Yazar */}
        <div className="min-h-[120px] flex flex-col justify-center">
          <H3 className="text-slate-800 dark:text-slate-100 italic text-center text-lg leading-relaxed">
            {currentQuote.quote}
          </H3>
          <span className="text-slate-500 dark:text-slate-400 block self-end mt-4 italic">
            — {currentQuote.author}
          </span>
        </div>

        {/* ALT KISIM: Buton */}
        <div className="mt-8">
          <Button
            onClick={handleNextQuote}
            variant="outline"
            size="lg"
            className="w-full transition-transform active:scale-95"
          >
            Next Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

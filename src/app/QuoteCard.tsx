import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { H3 } from "@/components/typography/H3";
import { Quote } from "@/app/QuotesContext";
import { useUser } from "@auth0/nextjs-auth0/client";

interface QuoteCardProps {
  currentQuote: Quote;
  isLiked: boolean;
  handleLikeQuote: (quote: Quote) => void;
  handleUnlikeQuote: (quote: Quote) => void;
  handleNextQuote: () => void;
}

export function QuoteCard({
  handleNextQuote,
  handleUnlikeQuote,
  handleLikeQuote,
  currentQuote,
  isLiked,
}: QuoteCardProps) {
  const { user } = useUser();

  return (
    <Card
      size="lg"
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-lg shadow-sm"
    >
      <CardContent className="flex flex-col p-6">
        <div className="flex items-center self-end gap-2 mb-4">
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
            {isLiked ? "❤️" : "🤍"}
          </Button>
        </div>
        <div className="min-h-[120px] flex flex-col justify-center">
          <H3 className="text-slate-800 dark:text-slate-100 italic text-center text-lg leading-relaxed">
            {currentQuote.quote}
          </H3>
          <span className="text-slate-500 dark:text-slate-400 block self-end mt-4 italic">
            — {currentQuote.author}
          </span>
        </div>
        <div className="mt-8">
          <Button
            onClick={handleNextQuote}
            className="w-full font-bold bg-black text-white"
          >
            Next Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

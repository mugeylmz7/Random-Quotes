import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { H3 } from "@/components/typography/H3";

export function QuoteCard({
  handleNextQuote,
  handleUnlikeQuote,
  handleLikeQuote,
  currentQuote,
  isLiked,
}) {
  return (
    <Card
      size="lg"
      className="bg-white border border-slate-200 dark:border-slate-800 p-6 rounded-lg shadow-sm"
    >
      <CardContent className="flex flex-col p-6">
        <div className="flex items-center self-end gap-2 mb-4">
          <span className="text-sm font-bold text-slate-600">
            {currentQuote.likeCount}
          </span>
          <Button
            variant={"ghost"}
            size="icon"
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
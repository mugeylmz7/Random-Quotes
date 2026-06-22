import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NewQuoteSuccessPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-xl text-slate-900 dark:text-slate-100">
        <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
          <span className="text-2xl text-green-600 dark:text-green-400">✓</span>
        </div>
        <h1 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
          Thank You!
        </h1>

        <p className="text-md text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          Your quote has been sent to the administrator for review and will be
          live shortly.
        </p>

        <Button
          asChild
          variant="outline"
          size="lg"
          className="mt-6 w-full sm:w-auto "
        >
          <Link href="/user/quotes/new">Add another quote</Link>
        </Button>
      </div>
    </main>
  );
}

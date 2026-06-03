
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default function NewQuoteSuccessPage() {
	return (
		<main className='min-h-screen flex-col justify-items-center pt-20'>
			<div className='max-w-md mx-auto text-center'>
				<h1>
					Thank you for adding a new quote. It's now sent to administator
					for review.
				</h1>
				<Button type="submit"
              variant="default"
              size="lg"
              className="m-6 w-full sm:w-auto font-semibold shadow-md bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
            >
					<Link href='/user/quotes/new'>Add another quote</Link>
				</Button>
			</div>
		</main>
	);
}
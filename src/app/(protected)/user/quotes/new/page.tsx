'use client';

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useActionState } from 'react';
import { addNewQuote } from "./action";
import { quotes } from "@/quotes";
import { redirect } from "next/navigation";

// Extract the type from the first element or use typeof
export type Quote = typeof quotes[0];

export type AddNewQuoteState = {
  success: boolean;
  errors?: any;
  message?: string;
  data?: Partial<Quote>
}

const initialAddNewQuoteState: AddNewQuoteState = {
  success: false
}

export default function AddNewQuotePage() {
  const [state, dispatchAction, isPending] = useActionState(addNewQuote, initialAddNewQuoteState);

	  if (state.success) return redirect('/user/quotes/new/success');

  return (
    <main className="min-h-screen flex-col justify-items-center mt-20 dark:bg-slate-900">
      <form className="w-full max-w-md" action={dispatchAction}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend className="text-4xl font-bold dark:text-white flex items-center justify-center mb-4">
              Add a New Quote
            </FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="author">
                  Author
                </FieldLabel>
                <Input type="text"
                  name='author'
                  id="author"
                  placeholder="Evil Rabbit"
                  required
                  aria-invalid={!!state.errors?.author}
                  aria-describedby={state.errors?.author ? "author-error" : undefined}
									defaultValue={state.data?.author}
                />
                {state.errors?.author && (
                  <div id="author-error" aria-live="polite" className="text-red-500 text-sm mt-1">
                    <FieldError errors={state.errors?.author}>
                      {state.errors?.author}
                    </FieldError>
                  </div>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="quote">
                  Quote
                </FieldLabel>
                <Textarea
                  id="quote"
                  name="quote"
                  required
                  placeholder="Add the quote"
                  className="resize-none"
                  aria-invalid={!!state.errors?.quote}
                  aria-describedby={state.errors?.quote ? "quote-error" : undefined}
									defaultValue={state.data?.quote}
                />
                {state.errors?.quote && (
                  <div id="quote-error" aria-live="polite" className="text-red-500 text-sm mt-1">
                    <FieldError errors={state.errors?.quote}>
                      {state.errors?.quote}
                    </FieldError>
                  </div>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>


          <Field orientation="horizontal">
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Adding...' : 'Create Quote'}
            </Button>
            <Button variant="outline" type="reset">
              Clear
            </Button>
          </Field>
        </FieldGroup>
      </form>
      {state?.message && (
        <p className={`mt-10 text-center ${state.success ? 'text-green-600' : 'text-red-500'}`}>
          {state.message}
        </p>
      )}
    </main>
  );
}
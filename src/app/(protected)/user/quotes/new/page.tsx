"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import { addNewQuote } from "./action";
import { redirect } from "next/navigation";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import {
  AddNewQuoteState,
  NewQuoteInput,
  newQuoteSchema,
} from "@/types/quotes";

const initialAddNewQuoteState: AddNewQuoteState = {
  success: false,
};

export default function AddNewQuotePage() {
  const [state, dispatchAction, isPending] = useActionState(
    addNewQuote,
    initialAddNewQuoteState,
  );

  const {
    register,
    trigger, // İsteğe bağlı olarak form doğrulamasını manuel tetiklemek için
    formState: { errors: clientSideErrors },
  } = useForm<NewQuoteInput>({
    mode: "onBlur",
    resolver: zodResolver(newQuoteSchema),
  });

  if (state.success) return redirect("/user/quotes/new/success");

  return (
    <main className="min-h-screen flex flex-col items-center mt-20 dark:bg-slate-900">
      <form
        className="w-full max-w-md"
        action={dispatchAction}
        onSubmit={async (e) => {
          // Önce react-hook-form'un kurallarını çalıştır (CLIENT-SIDE VALIDATION)
          const isValid = await trigger();
          if (!isValid) {
            e.preventDefault(); // Hata varsa sunucuya gitmeyi DURDUR
          }
        }}
      >
        <FieldGroup>
          <FieldSet>
            <FieldLegend className="text-4xl font-bold dark:text-white flex items-center justify-center mb-4">
              Add a New Quote
            </FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="author">Author</FieldLabel>
                <Input
                  type="text"
                  id="author"
                  placeholder="Evil Rabbit"
                  aria-invalid={!!state.errors?.fieldErrors?.author}
                  aria-describedby={
                    state.errors?.fieldErrors?.author
                      ? "author-error"
                      : undefined
                  }
                  defaultValue={state.data?.author}
                  {...register("author")}
                />
                {state.errors?.fieldErrors?.author && (
                  <div
                    id="author-error"
                    aria-live="polite"
                    className="text-red-500 text-sm mt-1"
                  >
                    <FieldError errors={state.errors?.fieldErrors?.author}>
                      {state.errors?.fieldErrors?.author}
                    </FieldError>
                  </div>
                )}

                {clientSideErrors.author && (
                  <div className="text-red-500 text-sm mt-1 font-medium">
                    <FieldError errors={clientSideErrors.author.message}>
                      {clientSideErrors.author.message}
                    </FieldError>
                  </div>
                )}
              </Field>

              {/* CATEGORY FIELD (ÖDEVDE İSTENEN BONUS) */}
              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <select
                  id="category"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  aria-invalid={!!state.errors?.fieldErrors?.category}
                  aria-describedby={
                    state.errors?.fieldErrors?.category
                      ? "category-error"
                      : undefined
                  }
                  defaultValue={state.data?.category}
                  {...register("category")}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="Inspirational">Inspirational</option>
                  <option value="Motivational">Motivational</option>
                  <option value="Life">Life</option>
                  <option value="Humor">Humor</option>
                  <option value="Wisdom">Wisdom</option>
                </select>
                {state.errors?.fieldErrors?.category && (
                  <div
                    id="category-error"
                    aria-live="polite"
                    className="text-red-500 text-sm mt-1"
                  >
                    <FieldError errors={state.errors?.fieldErrors?.category}>
                      {state.errors?.fieldErrors?.category}
                    </FieldError>
                  </div>
                )}
                {clientSideErrors.category && (
                  <div className="text-red-500 text-sm mt-1 font-medium">
                    <FieldError errors={clientSideErrors.category.message}>
                      {clientSideErrors.category.message}
                    </FieldError>
                  </div>
                )}
              </Field>

              {/* QUOTE FIELD */}
              <Field>
                <FieldLabel htmlFor="quote">Quote</FieldLabel>
                <Textarea
                  id="quote"
                  placeholder="Add the quote"
                  className="resize-none"
                  aria-invalid={!!state.errors?.fieldErrors?.quote}
                  aria-describedby={
                    state.errors?.fieldErrors?.quote ? "quote-error" : undefined
                  }
                  defaultValue={state.data?.quote}
                  {...register("quote")}
                />
                {state.errors?.fieldErrors?.quote && (
                  <div
                    id="quote-error"
                    aria-live="polite"
                    className="text-red-500 text-sm mt-1"
                  >
                    <FieldError errors={state.errors?.fieldErrors?.quote}>
                      {state.errors?.fieldErrors?.quote}
                    </FieldError>
                  </div>
                )}

                {clientSideErrors.quote && (
                  <div className="text-red-500 text-sm mt-1 font-medium">
                    <FieldError errors={clientSideErrors.quote.message}>
                      {clientSideErrors.quote.message}
                    </FieldError>
                  </div>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>

          <Field orientation="horizontal">
            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={isPending}
              className="w-full sm:w-auto font-semibold shadow-md bg-blue-600 hover:bg-blue-900 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {isPending ? "Adding..." : "Create Quote"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              type="reset"
              className="w-full sm:w-auto font-semibold shadow-md bg-gray-200 hover:bg-gray-600 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              Clear
            </Button>
          </Field>
        </FieldGroup>
      </form>
      {state?.message && (
        <p
          className={`mt-10 text-center ${state.success ? "text-green-600" : "text-red-500"}`}
        >
          {state.message}
        </p>
      )}
    </main>
  );
}

'use client';

import { Button } from '@/components/ui/button';
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
import { useActionState, useEffect} from "react";
import { addNewQuote } from "./action";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { QuotesContext } from "@/app/QuotesContext";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddNewQuoteState,
  allCategories,
  NewQuoteInput,
  newQuoteSchema,
} from "@/types/quotes";

const initialAddNewQuoteState: AddNewQuoteState = {
  success: false,
};

export default function AddNewQuotePage() {
  const router = useRouter(); // Yönlendirme motorunu başlatıyoruz, böylece işlem başarılı olduktan sonra kullanıcıyı başka bir sayfaya yönlendirebiliriz.
  
  const [state, dispatchAction, isPending] = useActionState(
    addNewQuote,
    initialAddNewQuoteState,
  );

  const {
    register,
    formState: { errors: clientSideErrors },
  } = useForm<NewQuoteInput>({
    mode: 'onBlur',
		resolver: zodResolver(newQuoteSchema) as any
  });

  // 🛠️ SADELEŞTİRİLEN KISIM: Context'i aradan çıkardık.
  // Sadece işlem başarıyla tamamlandığında direkt yönlendirme yapıyoruz.
  useEffect(() => {
    if (state.success) {
      router.push("/user/quotes/success");
    }
  }, [state.success, router]);

  return (
    <main className="min-h-screen flex flex-col items-center mt-20 dark:bg-slate-900">
      <form className="w-full max-w-md" action={dispatchAction}>
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

                {clientSideErrors.author && !state.errors?.fieldErrors?.author &&(
                  <div className="text-red-500 text-sm mt-1 font-medium">
                    <FieldError errors={clientSideErrors.author.message}>
                      {clientSideErrors.author.message}
                    </FieldError>
                  </div>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <select
                  id="category"
                  className="mt-2 p-2 block w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white text-slate-900 dark:bg-slate-800 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                  aria-invalid={!!state.errors?.fieldErrors?.category}
                  aria-describedby={
                    state.errors?.fieldErrors?.category
                      ? "category-error"
                      : undefined
                  }
                  defaultValue={state.data?.category}
                  {...register("category")}
                >
                  <option value="" disabled className="bg-white text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    Select a category
                  </option>
                  {/* DİNAMİK KATEGORİ DÖNGÜSÜ */}
                  {allCategories.map((cat) => (
                    <option key={cat} value={cat} className="bg-white text-slate-900 dark:bg-slate-800 dark:text-white">
                      {cat}
                    </option>
                  ))}
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
                {clientSideErrors.category && !state.errors?.fieldErrors?.category && (
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

                {clientSideErrors.quote && !state.errors?.fieldErrors?.quote && (
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

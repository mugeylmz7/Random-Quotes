"use server";

import { auth0 } from "@/lib/auth0";
import { AddNewQuoteState } from "./page";
import z from "zod";

const NewQuoteSchema = z.object({
  author: z
    .string()
    .trim()
    .min(2, "Author must be at least 2 characters long.")
    .max(
      100,
      "Author must be less than 100 characters long.Please provide a valid author name.",
    ),
  quote: z
    .string()
    .trim()
    .min(10, "Quote must be at least 10 characters long.").max(
      1000,
      "Quote must be less than 1000 characters long. Please provide a valid quote.",
    ),
});

export async function addNewQuote(
  currentState: AddNewQuoteState,
  formData: FormData,
): Promise<AddNewQuoteState> {
  const session = await auth0.getSession();

  if (!session) {
    return {
      success: false,
      message: "Please log in to add a new quote.",
    };
  }

// Verileri alıyoruz
  const rawData = {
    author: formData.get("author")?.toString() ?? "",
    quote: formData.get("quote")?.toString() ?? "",
  };

  const validationOutput = NewQuoteSchema.safeParse(rawData);

    if (!validationOutput.success) {
    // Zod'un kendi standart hata formatlama metodunu kullanıyoruz
    const validationErrors = validationOutput.error.flatten().fieldErrors;
    console.log("validationErrors:", validationErrors);

    return {
      success: false,
      message: "Validation failed. Please correct the errors and try again.",
      errors: validationErrors,
      data: rawData,
    };
  } else {
    // Burada veritabanına kaydetme işlemi yapılabilir
     console.log("Validated data:", validationOutput.data);
    return {
      success: true,
      message: "Quote added successfully!"
    };
  }
}

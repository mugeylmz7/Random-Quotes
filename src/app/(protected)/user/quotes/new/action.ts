"use server";

import { auth0 } from "@/lib/auth0";
import { AddNewQuoteState, newQuoteSchema } from "@/types/quotes";
import z from "zod";
import { ca } from "zod/locales";

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
    category: formData.get("category")?.toString() ?? "",
  };

  const validationOutput = newQuoteSchema.safeParse(rawData);

  if (!validationOutput.success) {
    const validationErrors = z.flattenError(validationOutput.error);
    console.log("validationErrors", validationErrors);

    return {
      success: false,
      message: "Validation failed. Please correct the errors and try again.",
      errors: validationErrors as AddNewQuoteState["errors"],
      data: rawData,
    };
  } else {
    console.log("Validated data:", validationOutput.data);
    return {
      success: true,
      message: "Quote added successfully!",
    };
  }
}

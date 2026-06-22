import z from "zod";

// 1. KATEGORİ ENUM YAPISI (Tek Doğruluk Kaynağı)
export enum Category {
  Inspirational = "Inspirational",
  Motivational = "Motivational",
  Life = "Life",
  Humor = "Humor",
  Wisdom = "Wisdom",
}

// 2. Tüm kategorileri otomatik olarak bir diziye (array) çeviriyoruz
export const allCategories = Object.values(Category);

export const newQuoteSchema = z.object({
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
    .min(10, "Quote must be at least 10 characters long.")
    .max(
      1000,
      "Quote must be less than 1000 characters long. Please provide a valid quote.",
    ),
  category: z.nativeEnum(Category, {
    error: () => ({ message: "Please select a valid category" }),
  }),
});

export interface NewQuoteInput {
  author: string;
  quote: string;
  category: string;
}

export type AddNewQuoteState = {
  success: boolean;
  errors?: {
    quote: any;
    author: any;
    formErrors: string[];
    fieldErrors: {
      author?: string[];
      quote?: string[];
      category?: string[];
    };
  };
  message?: string;
  data?: Partial<NewQuoteInput>;
};

export interface Quote {
  _id?: string; // MongoDB'nin kendi atadığı benzersiz ID
  quote: string;
  author: string;
  category?: string;
  likedBy?: string[];
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  adminApproved?: boolean;
}

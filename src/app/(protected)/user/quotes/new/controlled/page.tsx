"use client";

import { useState } from "react";

export default function ControlledFormExample() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  return (
    <div className="min-h-screen flex-col justify-items-center mt-20 dark:bg-slate-900">
      <p className="text-center text-2xl font-bold dark:text-white mb-4">
        This is a controlled form example. Please fill out the form and submit
        to see the result.
      </p>
      <form className="w-full max-w-md mx-auto">
        <label
          htmlFor="quote"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Quote
        </label>
        <input
          type="text"
          id="quote"
          name="quote"
          value={quote}
          onChange={(e) => setQuote(e.target.value.toUpperCase())}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter your quote here"
          required
        />
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4"
        >
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter the author's name"
          required
        />
      </form>
    </div>
  );
}

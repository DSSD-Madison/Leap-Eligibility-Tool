import React from "react";
import { FlagIcon } from "@heroicons/react/24/solid";

function NotFound() {
  // testing branch
  return (
    <div class="py-10 px-4 mx-auto max-w-screen-xl lg:py-20 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center">
        <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-yellow-400">
          404
        </h1>
        <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
          Something's missing.
        </p>
        <p class="mb-4 text-lg font-light text-gray-500">
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.{" "}
        </p>

        <a
          href="/"
          class="inline-flex text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
        >
          Back to Homepage
        </a>
      </div>
    </div>
  );
}

export default NotFound;

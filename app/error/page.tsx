"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message") || "Something went wrong";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Oops!</h1>
      <p className="text-lg text-red-500">{decodeURIComponent(message)}</p>
    </div>
  );
}

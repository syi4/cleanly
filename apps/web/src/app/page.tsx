import type { JSX } from "react";

export default function Page(): JSX.Element {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="w-10/12 sm:w-1/2 lg:w-1/3">
        <h1>Home Page</h1>
      </div>
    </main>
  );
}

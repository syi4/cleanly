"use client";

import type { ComponentType, FC, PropsWithChildren } from "react";
import {
  type FallbackProps,
  ErrorBoundary as ReactErrorBoundary,
} from "react-error-boundary";

const Fallback = ({ error: _error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <p className="text-center text-black">Something went wrong!</p>
      <button
        type="button"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={() => resetErrorBoundary()}
      >
        Try again
      </button>
    </div>
  );
};

const ErrorBoundary = ({ children }: PropsWithChildren) => (
  <ReactErrorBoundary
    FallbackComponent={Fallback}
    onError={(error, info) => {
      console.error("Caught error:", error, info);
    }}
  >
    {children}
  </ReactErrorBoundary>
);

export { ErrorBoundary };

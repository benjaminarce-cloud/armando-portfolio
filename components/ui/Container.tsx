import type { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12">
      {children}
    </div>
  );
}

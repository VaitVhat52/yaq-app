"use client";

import { supabase } from "@/client";
import { NextUIProvider } from "@nextui-org/react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      <SessionContextProvider supabaseClient={supabase}>
        {children}
      </SessionContextProvider>
    </NextUIProvider>
  );
}

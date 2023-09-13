"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/client";
import { CircularProgress } from "@nextui-org/react";

export default function App() {
  const router = useRouter();

  async function session() {
    const { data, error } = await supabase.auth.getSession();

    if (!data.session) {
      router.push("/login");
    } else {
      router.push("/home");
    }
  }

  useEffect(() => {
    session();
  }, []);

  return (
    <div className="flex justify-center mt-[20%]">
      <CircularProgress size="lg" aria-label="Loading..." />
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/client";

export default function App() {
  const router = useRouter();

  async function session() {
    const { data, error } = await supabase.auth.getSession();

    if (data.session === null) {
      router.push("/login");
    }
  }

  useEffect(() => {
    session();
  }, []);

  return <div className="text-center mt-[20%]">Hello World</div>;
}

"use client";

import { supabase } from "@/client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const blog = () => {
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

  return <div>blog</div>;
};

export default blog;

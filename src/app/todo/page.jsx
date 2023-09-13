"use client";

import { supabase } from "@/client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const todo = () => {
  const router = useRouter();
  async function session() {
    const { data, error } = await supabase.auth.getSession();

    if (!data.session) {
      router.push("/login");
    }
  }

  useEffect(() => {
    session();
  }, []);

  return <div>todo</div>;
};

export default todo;

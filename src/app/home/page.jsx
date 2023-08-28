"use client";

import { supabase } from "@/client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  async function session() {
    const { data, error } = await supabase.auth.getSession();

    if (data.session === null) {
      router.push("/login");
    }
  }

  useEffect(() => {
    session();
  }, []);

  return <div className="text-4xl text-center mt-[20%]">Hello World</div>;
};

export default home;

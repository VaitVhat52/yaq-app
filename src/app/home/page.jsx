"use client";

import { supabase } from "@/client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const home = () => {
  const router = useRouter();
  const [name, setName] = useState();

  async function session() {
    const { data, error } = await supabase.auth.getSession();

    if (!data.session) {
      router.push("/login");
    }

    setName(data.session.user.user_metadata.full_name);
  }

  useEffect(() => {
    session();
  }, []);

  return <div className="text-4xl text-center mt-[20%]">Hello, {name}</div>;
};

export default home;

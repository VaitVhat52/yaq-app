"use client";

import { supabase } from "@/client";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Form from "./components/Form";

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

  return (
    <div className="container mt-20 mx-[17rem]">
      <span>
        <h1 className="text-4xl">Latest Posts</h1>
      </span>
    </div>
  );
};

export default blog;

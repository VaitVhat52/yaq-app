"use client";

import React, { useEffect } from "react";
import PostItem from "./PostItem";
import { useRouter } from "next/navigation";
import { supabase } from "@/client";

const PostList = () => {
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
    <div className="flex flex-col gap-7 mb-7">
      <PostItem />
    </div>
  );
};

export default PostList;

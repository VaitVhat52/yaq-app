"use client";

import { supabase } from "@/client";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const [postData, setPostData] = useState([]);

  async function getPostData() {
    let { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("link", `${params.id}`);
    setPostData(data);
    console.log(postData);
  }

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <div className="flex flex-col sm:gap-10 gap-8 mt-20 mx-[5%] sm:mx-[15%]">
      <h1 className="text-4xl">{postData?.[0]?.title}</h1>
    </div>
  );
};

export default page;

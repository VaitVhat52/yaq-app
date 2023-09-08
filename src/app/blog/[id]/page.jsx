"use client";

import { supabase } from "@/client";
import { Avatar } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const router = useRouter();
  const [postData, setPostData] = useState([]);
  const initials = postData?.[0]?.author
    .toUpperCase()
    .split(" ")
    .map((word) => word.charAt(0));

  async function getPostData() {
    let { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("link", `${params.id}`);
    setPostData(data);
    console.log(data);
    data.length == 0 ? router.push("/404") : null;
  }

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <div className="flex flex-col sm:gap-10 gap-8 mt-20 mx-[5%] sm:mx-[15%]">
      <h1 className="text-4xl">{postData?.[0]?.title}</h1>
      <span className="flex items-center gap-3">
        {postData?.[0]?.authorImageLink === "undefined" ? (
          <Avatar isBordered size="sm" name={initials} />
        ) : (
          <Avatar
            isBordered
            fall
            size="sm"
            src={postData?.[0]?.authorImageLink}
          />
        )}
        <p>{postData?.[0]?.author}</p>
      </span>
      <p className="whitespace-pre-wrap mb-10">{postData?.[0]?.content}</p>
    </div>
  );
};

export default page;

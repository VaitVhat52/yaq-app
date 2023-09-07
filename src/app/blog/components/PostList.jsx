"use client";

import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { useRouter } from "next/navigation";
import { supabase } from "@/client";

const PostList = () => {
  const [posts, setPosts] = useState();
  const router = useRouter();

  async function session() {
    const { data, error } = await supabase.auth.getSession();

    if (data.session === null) {
      router.push("/login");
    }
  }

  async function fetchBlogPosts() {
    const { data, error } = await supabase.from("blog_posts").select();
    setPosts(data);
    console.log(error);
  }

  useEffect(() => {
    session();
    fetchBlogPosts();
  }, []);

  return (
    <div className="flex flex-col gap-7 mb-7">
      {posts?.length() < 1 ? (
        <p>No Posts Found</p>
      ) : (
        posts?.map((post) => {
          <PostItem
            key={post.id}
            title={post?.title}
            author={post?.author}
            content={post?.content}
            avatarUrl={post?.authorImageLink}
            link={post?.link}
          />;
        })
      )}
    </div>
  );
};

export default PostList;

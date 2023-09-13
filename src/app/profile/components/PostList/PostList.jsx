"use client";

import React, { useEffect, useState } from "react";
import PostItem from "../PostItem/PostItem";
import { useRouter } from "next/navigation";
import { supabase } from "@/client";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [userid, setUserId] = useState("");
  const router = useRouter();

  async function session() {
    const { data, error } = await supabase.auth.getSession();

    setUserId(data?.session.user.id);

    if (data.session === null) {
      router.push("/login");
    }
  }

  async function fetchBlogPosts() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select()
      .eq("user_id", `${userid}`);

    setPosts(data);
    console.log(data);
    console.log(userid);
  }

  useEffect(() => {
    session();
    fetchBlogPosts();
  }, []);

  return (
    <div className="flex flex-col gap-7 mb-7">
      {posts?.length === 0 ? (
        <p className="text-center text-danger">No Posts Found</p>
      ) : (
        posts?.reverse().map((post) => {
          return (
            <PostItem
              key={post?.id}
              title={post?.title}
              author={post?.author}
              content={post?.content}
              avatarUrl={post?.authorImageLink}
              link={post?.link}
            />
          );
        })
      )}
    </div>
  );
};

export default PostList;

"use client";

import React, { useEffect, useState } from "react";
import PostItem from "../PostItem/PostItem";
import { useRouter } from "next/navigation";
import { supabase } from "@/client";
import { useSession } from "@supabase/auth-helpers-react";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  async function session() {
    const { data, error } = await supabase.auth.getSession();

    if (!data.session) {
      router.push("/login");
    }

    const { data: postData, error: postError } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("user_id", data.session.user.id);

    setPosts(postData);
  }

  useEffect(() => {
    session();
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

import React from "react";
import PostList from "./components/PostList";
import NewPostModal from "./components/NewPostModal";

const blog = () => {
  return (
    <div className="flex flex-col sm:gap-10 gap-8 mt-20 mx-[5%] sm:mx-[15%]">
      <div className="flex sm:flex-row flex-col items-center gap-5">
        <h1 className="text-4xl">Latest Posts</h1>

        <NewPostModal />
      </div>
      <PostList />
    </div>
  );
};

export default blog;

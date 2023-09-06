import { Button } from "@nextui-org/button";
import React from "react";
import { HiPlus } from "react-icons/hi";
import PostList from "./components/PostList";

const blog = () => {
  return (
    <div className="flex flex-col sm:gap-10 gap-8 mt-20 mx-[5%] sm:mx-[15%]">
      <div className="flex sm:flex-row flex-col items-center gap-5">
        <h1 className="text-4xl">Latest Posts</h1>
        <Button
          color="primary"
          size="sm"
          className="sm:w-auto sm:h-7 h-9 w-full"
        >
          <HiPlus size={"20px"} /> New Post
        </Button>
      </div>
      <PostList />
    </div>
  );
};

export default blog;

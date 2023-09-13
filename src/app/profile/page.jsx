import React from "react";
import Identity from "./components/Identity";
import PostList from "./components/PostList/PostList";

const page = () => {
  return (
    <div className="flex flex-col sm:gap-10 gap-8 sm:mt-10 mt-5 mx-[5%] sm:mx-[15%]">
      <Identity />
      <p className="text-center text-2xl">Your Posts:</p>
      <PostList />
    </div>
  );
};

export default page;

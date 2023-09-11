"use client";

import { supabase } from "@/client";
import { Divider, Textarea, Input, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Form = () => {
  const router = useRouter();
  const [linkInput, setLinkInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState();

  function handleLinkInput(e) {
    setLinkInput(e.target.value.replace(/\s/g, "").replace("/", ""));
  }

  function handleTitleInput(e) {
    setTitleInput(e.target.value);
  }

  function handleContentInput(e) {
    setContentInput(e.target.value);
  }

  async function createPost(e) {
    e.preventDefault();

    const { data, error } = await supabase.from("blog_posts").insert([
      {
        title: `${titleInput}`,
        content: `${contentInput}`,
        authorImageLink: `${profile}`,
        author: `${name}`,
        link: `${linkInput}`,
      },
    ]);

    !error ? router.push("/blog") : setError(error);
  }

  async function session() {
    const { data, error } = await supabase.auth.getSession();

    if (data.session === null) {
      router.push("/login");
    }

    setProfile(data.session.user.user_metadata.avatar_url);

    setName(data.session.user.user_metadata.full_name);
  }

  useEffect(() => {
    session();
  });

  return (
    <form onSubmit={createPost} className="flex flex-col mt-5 sm:gap-5 gap-3 ">
      {error?.code === "23514" && (
        <p className="text-danger text-center">
          Make sure none of the inputs are empty.
        </p>
      )}
      <Input
        autoFocus
        label="Title"
        labelPlacement="outside"
        value={titleInput}
        onChange={handleTitleInput}
        placeholder="Write a fancy shmancy title"
      />
      <Textarea
        minRows={10}
        label="Content"
        labelPlacement="outside"
        value={contentInput}
        onChange={handleContentInput}
        placeholder="Write a fancy shmancy body to your post"
        className={"col-span-12 md:col-span-6 "}
      />
      {/* <label htmlFor="fileInput" className="sm:-mt-2 -mt-5 text-small">
    Choose Cover Image
  </label>
  <input
    name="fileInput"
    type="file"
    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:foreground file:hover:cursor-pointer"
  /> */}
      <Divider className="my-1" />
      {error?.code === "23505" && (
        <p className="text-danger text-center">
          This link already exists. Please try another link.
        </p>
      )}
      <Input
        type="text"
        label="Link"
        labelPlacement="outside"
        value={linkInput}
        onChange={handleLinkInput}
        placeholder="Enter a fancy shmancy link"
        description={`The link to this post will be /blog/${linkInput}`}
      />
      <Button color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Form;

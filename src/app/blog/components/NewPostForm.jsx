"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

const Form = () => {
  const [sessionData, setSessionData] = useState();
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");

  async function session() {
    const { data, error } = await supabase.auth.getSession();
    setSessionData(data);
    console.log(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase.from("blog_posts").insert([
      {
        author: `${sessionData.session.user.user_metadata.full_name}`,
        title: `${titleInput}`,
        content: `${contentInput}`,
      },
    ]);
  }

  function handleTitleInput(e) {
    setTitleInput(e.target.value);
  }

  function handleContentInput(e) {
    setContentInput(e.target.value);
  }

  useEffect(() => {
    session();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        label="Title"
        value={titleInput}
        onChange={handleTitleInput}
      />
      <Input
        type="text"
        label="Content"
        value={contentInput}
        onChange={handleContentInput}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;

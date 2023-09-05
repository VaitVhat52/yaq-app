"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

const Form = () => {
  const [sessionData, setSessionData] = useState();

  async function session() {
    const { data, error } = await supabase.auth.getSession();
    setSessionData(data);
    console.log(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from("blog_posts")
      .insert([
        {
          user_id: `${sessionData.session.user.id}`,
          author: `${sessionData.session.user.user_metadata.full_name}`,
          title: " ",
          content: " ",
        },
      ]);
  }

  useEffect(() => {
    session();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" label="Title" />
      <Input type="text" label="Content" />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;

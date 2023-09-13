"use client";

import { supabase } from "@/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Identity = () => {
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");

  async function session() {
    const { data, error } = await supabase.auth.getSession();

    if (data.session === null) {
      router.push("/login");
    }

    setProfile(data.session.user.user_metadata.avatar_url);
    setName(data.session.user.user_metadata.full_name);

    console.log(data);
  }

  useEffect(() => {
    session();
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={`${profile}`}
        width={100}
        height={100}
        alt="Profile Picture"
        className="rounded-full mb-5"
      />
      <h1 className="text-4xl text-center leading-normal">
        Welcome,
        <br className="sm:hidden inline" /> {name}
      </h1>
    </div>
  );
};

export default Identity;

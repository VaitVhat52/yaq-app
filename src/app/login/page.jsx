"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { Divider } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function googleAuth() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
}

export default function login() {
  return (
    <div className="container mx-auto my-[7%]">
      <h1 className="text-4xl text-center my-10">Log In</h1>
      <form className="flex flex-col items-center gap-5">
        <Button
          color="primary"
          variant="flat"
          className="w-96 text-md"
          startContent={<FcGoogle className="text-xl" />}
          onClick={googleAuth}
        >
          Sign In with Google
        </Button>
        <Divider className="w-96" />
        <Input isRequired type="email" label="Email" className="w-96" />
        <Input isRequired type="password" label="Password" className="w-96" />
        <Button color="primary" href="#" className="w-96 text-md" type="submit">
          Sign In
        </Button>
        <span>
          Don't have an account? &nbsp;
          <Link href="/signup" className="hover:underline text-primary">
            Sign Up!
          </Link>
        </span>
      </form>
    </div>
  );
}

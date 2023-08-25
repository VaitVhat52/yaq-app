"use client";

import React from "react";
import Header from "@/components/Header/Header";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SignUp() {
  return (
    <div className="container mx-auto my-[10%]">
      {/* <h1 className="text-4xl text-center my-10">Create New Account</h1>
      <form className="flex flex-col items-center gap-5">
        <Input isRequired type="text" label="Full Name" className="w-96" />
        <Input isRequired type="email" label="Email" className="w-96" />
        <Input isRequired type="password" label="Password" className="w-96" />
        <Button
          color="primary"
          href="#"
          variant="flat"
          className="w-96"
          type="submit"
        >
          Sign Up
        </Button>
        <span>
          Already have an account? &nbsp;
          <Link href="/" className="hover:underline text-primary">
            Log In!
          </Link>
        </span>
      </form> */}
      <h1 className="text-4xl text-center my-10">Create New Account</h1>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        providers={[]}
        view="sign_in"
      />
    </div>
  );
}

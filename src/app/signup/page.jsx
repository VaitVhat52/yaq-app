"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { Divider } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "@/client";

export default function signup() {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  async function googleAuth() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  async function logInWithForm(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: emailInput,
      password: passwordInput,
      options: {
        data: {
          full_name: nameInput,
        },
      },
    });
    setNameInput("");
    setEmailInput("");
    setPasswordInput("");
  }

  function handleNameInput(e) {
    setNameInput(e.target.value);
  }
  function handleEmailInput(e) {
    setEmailInput(e.target.value);
  }
  function handlePassInput(e) {
    setPasswordInput(e.target.value);
  }

  return (
    <div className="container scale-90 sm:scale-100 mx-auto my-[7%]">
      <h1 className="text-4xl text-center my-10">Create New Account</h1>
      <form
        className="flex flex-col items-center gap-5 px-2"
        onSubmit={logInWithForm}
      >
        <Button
          color="primary"
          variant="flat"
          className="w-96 text-md"
          startContent={<FcGoogle className="text-xl" />}
          onClick={googleAuth}
        >
          Sign Up with Google
        </Button>
        <Divider className="w-96" />
        <Input
          isRequired
          type="text"
          label="Full Name"
          className="w-96"
          name="fullName"
          value={nameInput}
          onChange={handleNameInput}
        />
        <Input
          isRequired
          type="email"
          label="Email"
          className="w-96"
          name="email"
          value={emailInput}
          onChange={handleEmailInput}
        />
        <Input
          isRequired
          type="password"
          label="Password"
          className="w-96"
          name="password"
          value={passwordInput}
          onChange={handlePassInput}
        />

        <Button color="primary" href="" className="w-96 text-md" type="submit">
          Sign Up
        </Button>
        <span>
          Already have an account? &nbsp;
          <Link href="/login" className="hover:underline text-primary">
            Log In!
          </Link>
        </span>
      </form>
    </div>
  );
}

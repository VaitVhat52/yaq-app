"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { Divider } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { supabase } from "@/client";
import { useRouter } from "next/navigation";

const Form = () => {
  const router = useRouter();
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);

  async function googleAuth() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  async function githubAuth() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  }

  async function signUpWithForm(e) {
    e.preventDefault();
    let { data, error } = await supabase.auth.signUp({
      email: emailInput,
      password: passwordInput,
      options: {
        data: {
          full_name: nameInput,
        },
      },
    });
    !error ? setIsLoading(true) : null;
    !error ? setSubmitStatus(true) : null;
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
    <form
      className="flex flex-col items-center gap-5 px-2"
      onSubmit={signUpWithForm}
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
      <Button
        color="primary"
        variant="flat"
        className="w-96 text-md"
        startContent={<AiFillGithub className="text-xl" />}
        onClick={githubAuth}
      >
        Sign Up with GitHub
      </Button>
      <Divider className="w-96" />
      {submitStatus && (
        <p className="text-center text-success">Please Check your Email</p>
      )}
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

      <Button
        color="primary"
        className="w-96 text-md"
        type="submit"
        isLoading={isLoading}
      >
        Sign Up
      </Button>
      <span>
        Already have an account? &nbsp;
        <Link href="/login" className="hover:underline text-primary">
          Log In!
        </Link>
      </span>
    </form>
  );
};

export default Form;

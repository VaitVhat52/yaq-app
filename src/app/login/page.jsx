"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { Divider } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "@/client";
import { useRouter } from "next/navigation";

export default function login() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function session() {
    const { data, error } = await supabase.auth.getSession();

    if (data.session != null) {
      router.push("/");
    }
  }

  function handleEmailInput(e) {
    setEmailInput(e.target.value);
  }

  function handlePasswordInput(e) {
    setPasswordInput(e.target.value);
  }

  async function googleAuth() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  async function logInWithForm(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailInput,
      password: passwordInput,
    });
    !error ? null && router.push("/login") : setErrorStatus(true);
    router.push("/home");

    console.log(data.session);
  }

  function handleLoginClick() {
    setIsLoading(true);
  }

  useEffect(() => {
    session();
  }, []);

  return (
    <div className="container scale-90 sm:scale-100 mx-auto my-[7%]">
      <h1 className="text-4xl text-center my-10">Log In</h1>
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
          Sign In with Google
        </Button>
        <Divider className="w-96" />
        {errorStatus && (
          <p className="text-danger">Username or Password is Incorrect</p>
        )}
        <Input
          isRequired
          type="email"
          label="Email"
          className="w-96"
          value={emailInput}
          onChange={handleEmailInput}
        />
        <Input
          isRequired
          type="password"
          label="Password"
          className="w-96"
          value={passwordInput}
          onChange={handlePasswordInput}
        />
        <Button
          color="primary"
          href="#"
          className="w-96 text-md"
          type="submit"
          onClick={handleLoginClick}
          isLoading={isLoading}
        >
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

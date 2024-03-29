"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { supabase } from "@/client";
import { useRouter } from "next/navigation";

const Form = () => {
  const router = useRouter();
  const [emailInput, setEmailInput] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setEmailInput(e.target.value);
  };

  async function resetPassword(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      emailInput,
      {
        redirectTo: "https://yaq-app.vercel.app/update-password",
      }
    );
    error ? setErrorStatus(true) : setSubmitted(true);
    setEmailInput("");
  }

  return (
    <form
      className="flex flex-col items-center gap-5 px-2"
      onSubmit={resetPassword}
    >
      {errorStatus && (
        <p className="text-danger text-center">Email is not registered.</p>
      )}
      {submitted && (
        <p className="text-success text-center">Please check your email.</p>
      )}
      <Input
        isRequired
        type="email"
        label="Email associated with your account"
        className="w-96"
        value={emailInput}
        onChange={handleInputChange}
      />
      <Button color="primary" className="w-96 text-md" type="submit">
        Send Reset Email
      </Button>
    </form>
  );
};

export default Form;

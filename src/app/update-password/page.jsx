"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const updatePass = () => {
  const router = useRouter();
  const [passwordInput, setPasswordInput] = useState("");

  function handlePasswordInput(e) {
    setPasswordInput(e.target.value);
  }

  async function newPassword(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.updateUser({
      password: passwordInput,
    });
    router.push("/login");
  }

  return (
    <div className="container scale-90 sm:scale-100 mx-auto my-[7%]">
      <h1 className="text-4xl text-center my-10">Reset Password</h1>
      <form
        className="flex flex-col items-center gap-5 px-2"
        onSubmit={newPassword}
      >
        <Input
          isRequired
          type="password"
          label="New Password"
          className="w-96"
          value={passwordInput}
          onChange={handlePasswordInput}
        />
        <Button color="primary" className="w-96 text-md" type="submit">
          Update Password
        </Button>
      </form>
    </div>
  );
};

export default updatePass;

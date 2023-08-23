import React from "react";
import Header from "@/components/Header/Header";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto my-[10%]">
      <h1 className="text-4xl text-center my-10">Login</h1>
      <form className="flex flex-col items-center gap-5">
        <Input isRequired type="email" label="Email" className="w-96" />
        <Input isRequired type="password" label="Password" className="w-96" />
        <Button
          color="primary"
          href="#"
          variant="flat"
          className="w-96"
          type="submit"
        >
          Login
        </Button>
        <span>
          Dont Have an account? &nbsp;
          <Link href="/signup" className="hover:underline text-primary">
            Make One!
          </Link>
        </span>
      </form>
    </div>
  );
}

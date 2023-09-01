import React from "react";
import Form from "./components/Form";

export default function signup() {
  return (
    <div className="container scale-90 sm:scale-100 mx-auto my-[7%]">
      <h1 className="text-4xl text-center my-10">Create New Account</h1>
      <Form />
    </div>
  );
}

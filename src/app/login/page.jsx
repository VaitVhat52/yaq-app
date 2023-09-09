import React from "react";
import Form from "./components/Form/Form";

export default function login() {
  return (
    <div className="container scale-90 sm:scale-100 mx-auto my-[7%]">
      <h1 className="text-4xl text-center my-10">Log In</h1>
      <Form />
    </div>
  );
}

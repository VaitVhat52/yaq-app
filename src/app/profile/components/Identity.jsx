"use client";

import { supabase } from "@/client";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

const Identity = () => {
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [nameInput, setNameInput] = useState(name);
  const [editing, setEditing] = useState(false);

  async function session() {
    const { data, error } = await supabase.auth.getSession();

    if (!data.session) {
      router.push("/login");
    }

    setProfile(data.session.user.user_metadata.avatar_url);
    setName(data.session.user.user_metadata.full_name);
  }

  useEffect(() => {
    session();
  });

  function handleEdit() {
    setEditing(true);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={`${profile}`}
        width={100}
        height={100}
        alt="Profile Picture"
        className="rounded-full mb-5"
      />
      <span className="inline whitespace-nowrap">
        <h1 className="text-4xl text-center leading-normal">
          Welcome,
          <br className="sm:hidden inline" />
          {!editing ? (
            <> {name}</>
          ) : (
            <>
              <Input
                placeholder={name}
                isClearable
                size="lg"
                className="-mb-7 mt-7"
              />
              <Button className="mt-10" color="danger">
                Cancel
              </Button>
            </>
          )}
          &nbsp;
          {!editing && (
            <button onClick={handleEdit} className="cursor-pointer">
              <FaEdit className="inline align-middle" size={15} />
            </button>
          )}
        </h1>
      </span>
    </div>
  );
};

export default Identity;

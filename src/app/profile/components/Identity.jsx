"use client";

import { supabase } from "@/client";
import { Avatar, Button, Input, Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useRouter } from "next/navigation";

const Identity = ({ name: name2 }) => {
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [nameInput, setNameInput] = useState(name);
  const [editing, setEditing] = useState(false);
  const [initials, setInitials] = useState("");

  const router = useRouter();

  async function session() {
    const { data, error } = await supabase.auth.getSession();

    if (!data.session) {
      router.push("/login");
    }

    setProfile(data.session?.user.user_metadata.avatar_url);
    setName(data.session?.user.user_metadata.full_name);

    setInitials(
      name
        ?.toUpperCase()
        .split(" ")
        .map((word) => word.charAt(0))
    );
  }

  function handleEdit() {
    setEditing(true);
  }

  function cancelEdit() {
    setEditing(false);
  }

  function handleNameInput(e) {
    setNameInput(e.target.value);
  }

  async function updateName(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.updateUser({
      data: { full_name: nameInput },
    });
    !error ? setEditing(false) : console.log(error);
  }

  useEffect(() => {
    session();
  }, []);

  if (profile === "" || name === "")
    return <Spinner size="lg" className="mx-[10vw]" />;

  return (
    <div className="flex flex-col justify-center items-center">
      {profile === "" ? (
        <Avatar name={initials} className="w-28 h-28 text-3xl mb-5" />
      ) : (
        <Avatar src={profile} className="w-28 h-28 mb-5" />
      )}
      <span className="inline whitespace-nowrap">
        <h1 className="text-4xl text-center leading-normal">
          Welcome,
          <br className="sm:hidden inline" />
          {!editing ? (
            <> {name}</>
          ) : (
            <>
              <form className="mt-6 -mb-10" onSubmit={updateName}>
                <Input
                  isClearable
                  placeholder={name}
                  size="lg"
                  className="-mb-5"
                  value={nameInput}
                  onChange={handleNameInput}
                  onClear={() => setNameInput("")}
                />
                <span className="flex justify-center gap-3">
                  <Button className="mt-10" color="danger" onClick={cancelEdit}>
                    Cancel
                  </Button>
                  <Button className="mt-10" color="primary" type="submit">
                    Submit
                  </Button>
                </span>
              </form>
            </>
          )}
          &nbsp;
          {!editing && (
            <button onClick={handleEdit} className="cursor-pointer">
              <AiOutlineEdit
                className="inline align-middle"
                size={20}
                color="#006FEE"
              />
            </button>
          )}
        </h1>
      </span>
    </div>
  );
};

export default Identity;

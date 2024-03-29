"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Textarea,
  Divider,
} from "@nextui-org/react";
import Link from "next/link";
import { HiPlus } from "react-icons/hi";
import { Button } from "@nextui-org/button";
import { supabase } from "@/client";

const NewPostModal = () => {
  const [linkInput, setLinkInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function handleLinkInput(e) {
    setLinkInput(e.target.value.replace(/[^a-zA-Z0-9]/g, ""));
  }

  function handleTitleInput(e) {
    setTitleInput(e.target.value);
  }

  function handleContentInput(e) {
    setContentInput(e.target.value);
  }

  async function createPost(e) {
    e.preventDefault();

    const { data, error } = await supabase.from("blog_posts").insert([
      {
        title: `${titleInput}`,
        content: `${contentInput}`,
        authorImageLink: `${profile}`,
        author: `${name}`,
        link: `${linkInput}`,
      },
    ]);

    !error ? window.location.replace("/blog") : setError(error);
    console.log(error);
  }

  async function session() {
    const { data, error } = await supabase.auth.getSession();

    setProfile(data.session?.user.user_metadata.avatar_url);

    setName(data.session?.user.user_metadata.full_name);
  }

  useEffect(() => {
    session();
  });

  return (
    <>
      <Button
        color="primary"
        size="sm"
        className="sm:w-auto sm:h-7 h-9 w-full hidden sm:flex"
        onPress={onOpen}
      >
        <HiPlus size={"20px"} /> New Post
      </Button>
      <Link
        color="primary"
        size="sm"
        href="/blog/new-post"
        className="sm:w-auto w-full sm:h-7 h-9 flex items-center justify-center gap-2 sm:hidden bg-primary text-white rounded-lg"
      >
        <HiPlus size={"20px"} /> New Post
      </Link>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        isDismissable={true}
        placement="top-center"
        className="sm:mx-auto m-5"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Post
              </ModalHeader>
              <ModalBody>
                {error?.code === "23514" && (
                  <p className="text-danger">
                    Make sure none of the inputs are empty.
                  </p>
                )}
                <Input
                  autoFocus
                  label="Title"
                  labelPlacement="outside"
                  value={titleInput}
                  onChange={handleTitleInput}
                  placeholder="Write a fancy shmancy title"
                  variant="bordered"
                />
                <Textarea
                  minRows={10}
                  variant="bordered"
                  label="Content"
                  labelPlacement="outside"
                  value={contentInput}
                  onChange={handleContentInput}
                  placeholder="Write a fancy shmancy body to your post"
                  className={`col-span-12 md:col-span-6 mb-6 md:mb-0`}
                />
                {/* <label
                  htmlFor="fileInput"
                  className="sm:-mt-2 -mt-5 text-small"
                >
                  Choose Cover Image
                </label>
                <input
                  name="fileInput"
                  type="file"
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:foreground file:hover:cursor-pointer"
                /> */}
                <Divider className="my-2" />
                {error?.code === "23505" && (
                  <p className="text-danger">
                    This link already exists. Please try another link.
                  </p>
                )}
                <Input
                  type="text"
                  label="Custom Link"
                  variant="bordered"
                  labelPlacement="outside"
                  value={linkInput}
                  onChange={handleLinkInput}
                  placeholder="Enter a fancy shmancy link"
                  description={`The link to this post will be /blog/${linkInput}`}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit" onClick={createPost}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewPostModal;

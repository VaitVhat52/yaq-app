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
import { HiPlus } from "react-icons/hi";
import { Button } from "@nextui-org/button";
import { supabase } from "@/client";

const NewPostModal = () => {
  const [linkInput, setLinkInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function handleLinkInput(e) {
    setLinkInput(e.target.value);
    if (linkInput == "/") {
      return;
    }
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
  }

  async function session() {
    const { data, error } = await supabase.auth.getSession();

    setProfile(data.session.user.user_metadata.avatar_url);

    setName(data.session.user.user_metadata.full_name);
  }

  useEffect(() => {
    session();
  });

  return (
    <>
      <Button
        color="primary"
        size="sm"
        className="sm:w-auto sm:h-7 h-9 w-full"
        onPress={onOpen}
      >
        <HiPlus size={"20px"} /> New Post
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
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
                  className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                />
                <label htmlFor="fileInput" className="-mt-5 text-small">
                  Choose Cover Image
                </label>
                <input name="fileInput" type="file" />
                <Divider className="my-2" />
                <Input
                  type="text"
                  label="Link"
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
                <Button color="primary" onPress={onClose} onClick={createPost}>
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

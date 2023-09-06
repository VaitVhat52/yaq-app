"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { HiPlus } from "react-icons/hi";
import { Button } from "@nextui-org/button";
import Link from "next/link";

const NewPostModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
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
                  placeholder="Write a fancy shmancy title"
                  variant="bordered"
                />
                <Textarea
                  minRows={10}
                  variant="bordered"
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Write a fancy shmancy body to your post"
                  className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
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

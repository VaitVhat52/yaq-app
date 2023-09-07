import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";

const PostItem = (props) => {
  return (
    <Link href={`/blog/${props.link}`} className="px-full">
      <Card isHoverable={true} className="px-4 py-2">
        <CardHeader className=" flex-col items-start gap-5">
          <h1 className="text-3xl">{props.title}</h1>
          <span className="flex items-center gap-3">
            <Avatar isBordered size="sm" src={props.avatarUrl} />
            <p>{props.author}</p>
          </span>
        </CardHeader>
        <CardBody className="py-2 max-h-20 overflow-hidden">
          <p>{props.content}</p>
        </CardBody>
      </Card>
    </Link>
  );
};

export default PostItem;

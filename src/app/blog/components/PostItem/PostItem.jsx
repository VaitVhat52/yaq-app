import { Avatar, Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import EllipsisText from "react-ellipsis-text";

const PostItem = (props) => {
  const initials = props.author
    .toUpperCase()
    .split(" ")
    .map((word) => word.charAt(0));

  return (
    <Link href={`/blog/${props.link}`} className="px-full">
      <Card isHoverable={true} className="px-4 py-2">
        <CardHeader className=" flex-col items-start gap-5">
          <h1 className="text-3xl">{props.title}</h1>
          <span className="flex items-center gap-3">
            {props.avatarUrl === "undefined" ? (
              <Avatar isBordered size="sm" name={initials} />
            ) : (
              <Avatar isBordered fall size="sm" src={props.avatarUrl} />
            )}
            <p>{props.author}</p>
          </span>
        </CardHeader>
        <CardBody className="py-2 max-h-20 overflow-hidden">
          <EllipsisText
            text={props.content}
            length={280}
            className="whitespace-pre-wrap"
          />
        </CardBody>
      </Card>
    </Link>
  );
};

export default PostItem;

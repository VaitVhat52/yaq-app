import { Avatar, Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import EllipsisText from "react-ellipsis-text";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineEdit } from "react-icons/ai";

const PostItem = (props) => {
  const initials = props.author
    .toUpperCase()
    .split(" ")
    .map((word) => word.charAt(0));

  return (
    <Card isHoverable={false} className="px-4 py-2">
      <CardHeader className=" flex-col items-start gap-5">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-3xl">{props.title}</h1>
          {/* <span className="flex items-center gap-3">
            <button>
              <AiOutlineEdit size={25} color="#006FEE" />
            </button>
            <button className="cursor-pointer">
              <RxCross2 size={30} color="red" />
            </button>
          </span> */}
        </div>
        <div className="flex items-center gap-3">
          {props.avatarUrl === "undefined" ? (
            <Avatar isBordered size="sm" name={initials} />
          ) : (
            <Avatar isBordered size="sm" src={props.avatarUrl} />
          )}
          <p>{props.author}</p>
        </div>
      </CardHeader>
      <CardBody className="py-2 max-h-20 overflow-hidden">
        <EllipsisText
          text={props.content}
          length={280}
          className="whitespace-pre-wrap"
        />
      </CardBody>
    </Card>
  );
};

export default PostItem;

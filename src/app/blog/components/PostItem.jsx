import { Avatar, Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const PostItem = () => {
  return (
    <Link href="" className="px-full">
      <Card isHoverable={true} className="px-4 py-2">
        <CardHeader className=" flex-col items-start gap-5">
          <h1 className="text-3xl">
            REally super duper specially long title for a title
          </h1>
          <span className="flex items-center gap-3">
            <Avatar isBordered size="sm" name="A" />
            <p>Author</p>
          </span>
        </CardHeader>
        <CardBody className="py-2 max-h-20 overflow-hidden">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia
            neque ab magni beatae tempora sequi in minus porro aspernatur! Et
            alias doloremque quidem, eos repellat error culpa inventore earum
            facilis! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Cupiditate distinctio alias itaque quia atque impedit ratione cum,
            excepturi laborum aperiam autem reprehenderit voluptatem asperiores!
            Est ad veritatis eveniet in quasi? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Impedit porro voluptatibus fugiat
            vitae vero nisi a sed nobis, cumque dolores non accusamus delectus
            omnis expedita magnam. Id incidunt sed hic.
          </p>
        </CardBody>
      </Card>
    </Link>
  );
};

export default PostItem;

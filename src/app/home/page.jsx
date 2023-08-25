"use client";

import { usePathname } from "next/navigation";
import React from "react";

const home = () => {
  const pathName = usePathname();
  return <div className="text-4xl text-center mt-[20%]">Hello World</div>;
};

export default home;

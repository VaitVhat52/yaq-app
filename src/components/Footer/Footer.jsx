import { Divider } from "@nextui-org/divider";
import React from "react";

const Footer = () => {
  return (
    <div>
      <Divider className="fixed bottom-16" />
      <p className="fixed bottom-5 w-full text-center">
        &copy; {new Date().getFullYear()} Yaq Kakda
      </p>
    </div>
  );
};

export default Footer;

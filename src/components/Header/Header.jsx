"use client";

import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { supabase } from "@/client";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [buttonState, setButtonState] = useState(false);

  async function logout() {
    const { error } = await supabase.auth.signOut();
    session();
    router.push("/login");
  }

  async function session() {
    const { data, error } = await supabase.auth.getSession();
    console.log(data, error);

    if (data.session === null) {
      setButtonState(false);
    } else {
      setButtonState(true);
    }
  }

  useEffect(() => {
    session();
  }, []);

  return (
    <Navbar isBordered shouldHideOnScroll>
      <NavbarBrand>
        <Link className="font-bold text-inherit" href="/home">
          Yaq's App Thingy
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Blog
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            To Do
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            href="/login"
            color="primary"
            className={buttonState ? "hidden" : ""}
            variant="flat"
          >
            Sign In
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            color="primary"
            className={buttonState ? "" : "hidden"}
            variant="flat"
            onClick={logout}
          >
            Sign Out
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;

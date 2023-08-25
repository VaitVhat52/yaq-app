"use client";

import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { supabase } from "@/client";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [sessionState, setSessionState] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Home", "Blog", "To Do"];

  async function logout() {
    const { error } = await supabase.auth.signOut();
    session();
    router.push("/login");
    setIsMenuOpen(false);
  }

  async function session() {
    const { data, error } = await supabase.auth.getSession();

    if (data.session === null) {
      setSessionState(false);
    } else {
      setSessionState(true);
    }
  }

  useEffect(() => {
    session();
  }, []);

  return (
    <Navbar
      isBordered
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarContent>
        <NavbarBrand>
          <Link className="font-bold text-inherit" href="/">
            Yaq's App Thingy
          </Link>
        </NavbarBrand>
      </NavbarContent>
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
            className={sessionState ? "hidden" : ""}
            variant="flat"
          >
            Sign In
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            color="primary"
            className={sessionState ? "" : "hidden"}
            variant="flat"
            onClick={logout}
          >
            Sign Out
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
        {sessionState && (
          <Link
            className="w-full text-xl text-danger"
            href="/login"
            onClick={logout}
          >
            Log Out
          </Link>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;

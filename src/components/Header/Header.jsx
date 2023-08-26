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
import { useRouter, usePathname } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";

const Header = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [sessionState, setSessionState] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navSelected, setNavSelected] = useState("");
  const [profile, setProfile] = useState("");

  const menuItems = ["Home", "Blog", "To Do"];

  async function logout() {
    const { error } = await supabase.auth.signOut();
    session();
    setIsMenuOpen(false);
    router.push("/login");
  }

  function navMenuRoute() {
    setIsMenuOpen(false);
  }

  async function session() {
    const { data, error } = await supabase.auth.getSession();

    if (data.session === null) {
      setSessionState(false);
    } else {
      setSessionState(true);
      console.log(data.session);
    }

    setProfile(
      !data.session ? null : data.session.user.user_metadata.avatar_url
    );
  }

  useEffect(() => {
    setNavSelected(pathName.split("/")[1].toLowerCase());
  });

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
        <NavbarItem isActive={navSelected === "home"}>
          <Link href="/home">Home</Link>
        </NavbarItem>
        <NavbarItem isActive={navSelected === "blog"}>
          <Link href="/blog">Blog</Link>
        </NavbarItem>
        <NavbarItem isActive={navSelected === "todo"}>
          <Link href="/todo">To Do</Link>
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
          {sessionState && (
            <Dropdown>
              <DropdownTrigger>
                <Avatar className="hover:cursor-pointer" src={`${profile}`} />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="profile" as={Link} href="/profile">
                  Profile
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onClick={logout}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              href={`/${item.replaceAll(" ", "").toLowerCase()}`}
              size="lg"
              onClick={navMenuRoute}
            >
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

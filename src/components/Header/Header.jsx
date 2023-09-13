"use client";

import React, { useEffect, useReducer, useState } from "react";
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
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";

const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [sessionState, setSessionState] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navSelected, setNavSelected] = useState("");
  const [profile, setProfile] = useState("");
  const [initials, setInitials] = useState("");
  const [hasProfilePic, setHasProfilePic] = useState(false);

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

    if (!data.session) {
      setSessionState(false);
    } else {
      setSessionState(true);
    }

    setProfile(
      !data.session ? null : data.session.user.user_metadata.avatar_url
    );

    setInitials(
      !data.session
        ? null
        : data.session.user.user_metadata.full_name
            .toUpperCase()
            .split(" ")
            .map((word) => word.charAt(0))
    );

    setHasProfilePic(
      !data.session
        ? null
        : data.session.user.user_metadata.avatar_url
        ? true
        : false
    );
  }

  useEffect(() => {
    setNavSelected(pathName);
  }, [pathName, searchParams]);

  useEffect(() => {
    session();
  }, []);

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarContent>
        <NavbarBrand>
          <Link className="font-bold text-inherit" href="/">
            Yaq App
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={navSelected === "/home"}>
          <Link href={sessionState ? "/home" : ""}>Home</Link>
        </NavbarItem>
        <NavbarItem isActive={navSelected === "/blog"}>
          <Link href={sessionState ? "/blog" : ""}>Blog</Link>
        </NavbarItem>
        <NavbarItem isActive={navSelected === "/todo"}>
          <Link href={sessionState ? "/todo" : ""}>To Do</Link>
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
                {hasProfilePic ? (
                  <Avatar
                    isBordered
                    size="sm"
                    className="hover:cursor-pointer"
                    src={`${profile}`}
                  />
                ) : (
                  <Avatar
                    isBordered
                    size="sm"
                    className="hover:cursor-pointer"
                    name={initials}
                  />
                )}
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
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;

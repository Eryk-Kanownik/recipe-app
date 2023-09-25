"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";
import style from "../styles/component-styles/navbar.module.css";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
  const pathname = usePathname();
  const [windowWidth, setWindowWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLower, setIsLower] = useState(false);

  useEffect(() => {
    if (session.status === "authenticated") {
      setIsLoggedIn(true);
    } else if (session.status === "unauthenticated") {
      setIsLoggedIn(false);
    }
  }, [session.status]);

  useEffect(() => {
    window.addEventListener("resize", (e: any) => {
      setWindowWidth(e.target.innerWidth);
    });
  }, []);

  useEffect(() => {
    if (windowWidth > 900) {
      setIsVisible(false);
    }
  }, [windowWidth, isVisible]);

  const onClick = () => {
    if (windowWidth > 900) {
      setIsVisible((prev) => false);
    } else {
      setIsVisible(false);
    }
  };

  const logout = () => {
    signOut();
  };

  const loggedIn = (
    <>
      <Link
        className={`${style.navbarItem} ${
          pathname === "/users/1" ? style.currentPageActive : null
        }`}
        href={`/users/${session.data?.user?.id}`}
        onClick={() => onClick()}
      >
        {session.data?.user.name}
      </Link>
      <Link
        className={`${style.navbarItem} ${
          pathname === "/recipes/create" ? style.currentPageActive : null
        }`}
        href="/recipes/create"
        onClick={() => onClick()}
      >
        Create Recipe
      </Link>

      <Link
        className={`${style.navbarItem} ${
          pathname === "/recipes" ? style.currentPageActive : null
        }`}
        href="/recipes"
        onClick={() => onClick()}
      >
        Recipes
      </Link>
      <Link
        className={`${style.navbarItem} ${
          pathname === "/users" ? style.currentPageActive : null
        }`}
        href="/users"
        onClick={() => onClick()}
      >
        Users
      </Link>
      <Link
        className={`${style.navbarItem} ${
          pathname === "/register" ? style.currentPageActive : null
        }`}
        href="#"
        onClick={() => logout()}
      >
        Logout
      </Link>
    </>
  );

  const loggedOut = (
    <>
      <Link
        className={`${style.navbarItem} ${
          pathname === "/recipes" ? style.currentPageActive : null
        }`}
        href="/recipes"
        onClick={() => onClick()}
      >
        Recipes
      </Link>
      <Link
        className={`${style.navbarItem} ${
          pathname === "/login" ? style.currentPageActive : null
        }`}
        href="/login"
        onClick={() => onClick()}
      >
        Login
      </Link>
      <Link
        className={`${style.navbarItem} ${
          pathname === "/register" ? style.currentPageActive : null
        }`}
        href="/register"
        onClick={() => onClick()}
      >
        Register
      </Link>
    </>
  );

  return (
    <div
      className={`${style.navbar} ${isVisible ? style.isVisibleNavbar : null}`}
    >
      <div className={style.navbarLogo}>
        <Link href="/">Recipe-App</Link>
      </div>
      <div
        className={`${style.navbarItems} ${isVisible ? style.isVisible : null}`}
      >
        {isLoggedIn ? loggedIn : loggedOut}
      </div>
      <div
        className={`${style.navbarToggler} ${
          isVisible ? style.isVisibleHamburger : ""
        }`}
        onClick={() => setIsVisible((prev) => !prev)}
      >
        <FaBars />
      </div>
    </div>
  );
};

export default Navbar;

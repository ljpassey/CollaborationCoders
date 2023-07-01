"use client";

import React from "react";

import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <Image
              src="/assets/images/logo.svg"
              width={30}
              height={30}
              alt="collaboration coders logo"
            />
          <strong>Collaboration Coders</strong>
          </Link>
        </li>
      </ul>
      <div>
        <Link href="/about">About</Link>
        <Link href="/blog">Blog</Link>
      </div>
    </nav>
  );
};

export default Nav;

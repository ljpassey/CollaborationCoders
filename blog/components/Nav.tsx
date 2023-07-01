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
              width={40}
              height={40}
              alt="collaboration coders logo"
            />
            <strong>Collaboration Coders</strong>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

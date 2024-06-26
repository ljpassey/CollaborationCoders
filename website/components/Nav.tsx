"use client";

import Link from "next/link";
import { Disclosure, Menu } from "@headlessui/react";
import MyMenu from "./Menu";

const Navbar = () => {
  const navigation = ["About", "Work", "Blog", "Contact"];

  return (
    <div className="w-full">
      <nav className=" relative flex items-center justify-between px-2 py-8 mx-2  xl:px-5">
        <Link className="inline-flex" href="/">
          <svg
            width="64px"
            height="64px"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g fill="none" fill-rule="evenodd">
                {" "}
                <circle cx="16" cy="16" fill="#db5800" r="16"></circle>{" "}
                <path
                  d="M12.605 9.155c-.857 0-1.552-.706-1.552-1.577S11.748 6 12.605 6c.858 0 1.553.706 1.553 1.578s-.695 1.577-1.553 1.577zM19.447 26a1.565 1.565 0 01-1.552-1.578c0-.87.695-1.577 1.552-1.577.858 0 1.553.706 1.553 1.577 0 .872-.695 1.578-1.553 1.578zm-6.205-11.79a1.38 1.38 0 01-1.955-.265 1.432 1.432 0 01.26-1.986l7.158-5.562a1.38 1.38 0 011.955.265 1.432 1.432 0 01-.26 1.987zm.053 5.669a1.38 1.38 0 01-1.955-.265 1.432 1.432 0 01.26-1.987l7.158-5.561a1.38 1.38 0 011.955.265 1.432 1.432 0 01-.26 1.986zm0 5.829a1.38 1.38 0 01-1.955-.265 1.432 1.432 0 01.26-1.987l7.158-5.561a1.38 1.38 0 011.955.265 1.432 1.432 0 01-.26 1.986z"
                  fill="#ffffff"
                ></path>{" "}
              </g>{" "}
            </g>
          </svg>
          <div className="flex font-bold items-center justify-between w-full text-3xl mx-2  ">
            Dunerise Development
          </div>
        </Link>
        {/* menu  */}
        <div className="hidden text-center md:flex items-center">
          <ul className="items-center justify-end flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link
                  href={`/${menu.toLowerCase()}`} // append the name of the menu item to the end of the URL
                  className="inline-block px-4 py-2 text-lg font-normal bg-white bg-opacity-20 text-gray-200 no-underline rounded-md dark:text-gray-200 hover:text-orange-600 focus:text-white focus:bg-orange-600 focus:outline-none dark:focus:bg-orange-600"
                >
                  {menu}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <MyMenu />
      </nav>
    </div>
  );
};

export default Navbar;

import Link from "next/link";

const Navbar = () => {
  const navigation = ["About", "Work", "Blog"];

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        <Link href="/">
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
        </Link>

        <div className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
          Dunerise Development
        </div>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link
                  href={`/${menu.toLowerCase()}`} // append the name of the menu item to the end of the URL
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-orange-600 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  {menu}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

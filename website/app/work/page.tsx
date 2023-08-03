import React from "react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <section className=" h-fit xs:mx-10 mx-5  my-5 text-white rounded-lg border-4 border-orange-600   border-opacity-50 justify-center content-center body-font">
        <div className="  px-4 py-5">
          <div className=" text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="inline-block w-8 h-8 text-orange-600 mb-8"
              viewBox="0 0 975.036 975.036"
            >
              <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
            </svg>
            <p className="leading-relaxed text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              inventore, excepturi rem numquam a praesentium eius debitis, iste
              similique perferendis eum, ad assumenda autem cum ullam. Fuga
              saepe esse sapiente!
            </p>
            <span className="inline-block h-1 w-10 rounded bg-orange-600 mt-8 mb-6"></span>
            <h2 className="text-orange-600 font-bold title-font tracking-wider text-sm">
              HOLDEN CAULFIELD
            </h2>
            <p className="text-gray-100">Senior Product Designer</p>
          </div>
        </div>
      </section>
      <section className="h-fit mx-5 my-5 text-white rounded-lg border-4 border-orange-600   border-opacity-50 bg-opacity-30 justify-center content-center body-font">
        <div className="  px-5 py-5">
          <div className=" mx-auto text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="inline-block w-8 h-8 text-orange-600 mb-8"
              viewBox="0 0 975.036 975.036"
            >
              <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
            </svg>
            <p className="leading-relaxed text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              inventore, excepturi rem numquam a praesentium eius debitis, iste
              similique perferendis eum, ad assumenda autem cum ullam. Fuga
              saepe esse sapiente!
            </p>
            <span className="inline-block h-1 w-10 rounded bg-orange-600 mt-8 mb-6"></span>
            <h2 className="text-orange-600 font-bold title-font tracking-wider text-sm">
              HOLDEN CAULFIELD
            </h2>
            <p className="text-gray-100">Senior Product Designer</p>
          </div>
        </div>
      </section>
      <section className="text-gray-400 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
                Projects
              </h1>
              <div className="h-1 w-20 bg-orange-600 rounded"></div>
            </div>
            <p className="lg:w-1/2 w-full leading-relaxed text-white text-opacity-90">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Praesentium laudantium, illo, numquam velit facilis totam rerum
              earum accusantium quibusdam magnam unde sapiente voluptas, cumque
              ipsa inventore consequatur voluptate harum? Minima.
            </p>
          </div>
          <Link href="" className="flex flex-wrap -m-4">
            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-gray-900 bg-opacity-80 p-6 rounded-lg">
                {/* <Image
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  href="https://dummyimage.com/720x400"
                  alt="content"
                  height={400}
                  width={400}
                /> */}
                <h3 className="tracking-widest text-orange-600 text-xs font-medium title-font">
                  SUBTITLE
                </h3>
                <h2 className="text-lg text-white font-medium title-font mb-4">
                  Chichen Itza
                </h2>
                <p className="leading-relaxed text-base">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Delectus libero id quibusdam, blanditiis tempora officia.
                  Temporibus, tempore. Excepturi, quidem tenetur perspiciatis
                  esse maiores quo hic voluptatibus, fuga ea doloribus nisi.
                </p>
              </div>
            </div>
            <Link href="" className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-gray-900 bg-opacity-80 p-6 rounded-lg">
                {/* <Image
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  href="https://dummyimage.com/721x401"
                  alt="content"
                /> */}
                <h3 className="tracking-widest text-orange-600 text-xs font-medium title-font">
                  SUBTITLE
                </h3>
                <h2 className="text-lg text-white font-medium title-font mb-4">
                  Colosseum Roma
                </h2>
                <p className="leading-relaxed text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi
                  perspiciatis nihil eveniet reiciendis ullam distinctio
                  architecto corporis ratione quidem deserunt vero, temporibus
                  pariatur! Nobis neque saepe ipsum, delectus quo modi?
                </p>
              </div>
            </Link>
            <Link href="" className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-gray-900 bg-opacity-80 p-6 rounded-lg">
                {/* <Image
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  href="https://dummyimage.com/722x402"
                  alt="content"
                /> */}
                <h3 className="tracking-widest text-orange-600 text-xs font-medium title-font">
                  SUBTITLE
                </h3>
                <h2 className="text-lg text-white font-medium title-font mb-4">
                  Great Pyramid of Giza
                </h2>
                <p className="leading-relaxed text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Labore sapiente repellat, saepe ut ullam nemo, harum
                  necessitatibus vero possimus, delectus dicta consequatur sunt?
                  Consectetur saepe, tenetur ipsa quod velit iste.
                </p>
              </div>
            </Link>
            <Link href="/" className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-gray-900 bg-opacity-80 p-6 rounded-lg">
                {/* <Image
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  href="https://dummyimage.com/723x403"
                  alt="content"
                /> */}
                <h3 className="tracking-widest text-orange-600 text-xs font-medium title-font">
                  SUBTITLE
                </h3>
                <h2 className="text-lg text-white font-medium title-font mb-4">
                  San Francisco
                </h2>
                <p className="leading-relaxed text-base">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                  ea, pariatur doloremque quibusdam unde, qui molestias nam
                  soluta dicta fugit neque quos doloribus? Minima sequi officiis
                  quidem odit ratione suscipit?
                </p>
              </div>
            </Link>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default page;

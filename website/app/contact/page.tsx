import React from 'react'

const page = () => {
  return (
    <div className="w-full sm:mx-10 mx-5 rounded-2xl bg-opacity-70 bg-gray-900  flex flex-col h-fit justify-center px-10">
      <section className="text-gray-200 body-font relative">
        <div className=" py-20 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-orange-600">
              Contact Us
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify.
            </p>
          </div>
          <div className="items-center justify-center ">
            <div className="sm:flex flex-wrap -m-2">
              <div className="p-2 sm:w-1/2 w-full">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-200"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full white bg-opacity-90 rounded border border-gray-300 focus:border-orange-600 focus:bg-white focus:ring-2 focus:ring-orange-600 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 sm:w-1/2 w-full">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-200"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-white bg-opacity-90 rounded border border-gray-300 focus:border-orange-600 focus:bg-white focus:ring-2 focus:ring-orange-600 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-200"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full bg-white bg-opacity-90 rounded border border-gray-300 focus:border-orange-600 focus:bg-white focus:ring-2 focus:ring-orange-600 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-gray-600 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 transition-all duration-200 ease-in rounded text-lg">
                  Send
                </button>
              </div>
              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <a className="text-orange-600">dunerisedev@gmail.com</a>
                <p className="leading-normal my-5">
                  801 Drive
                  <br />
                  Pleasant Grove, UT 84062
                </p>
              
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default page
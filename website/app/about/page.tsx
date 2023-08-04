import Image from "next/image";

const About = () => {
  return (
    <div className="flex w-full content-center justify-center align-middle">
      <section className="text-white body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-3xl font-bold title-font mb-4 text-orange-600">
              Our Team
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed
              minima maxime, vel quis, maiores facilis est autem aspernatur ipsa
              recusandae vero voluptas quas. Odit, odio dolorem tempora
              temporibus ad reiciendis?
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="p-4  md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <Image
                  alt="team"
                  className="flex-shrink-0 rounded-2xl w-full  object-cover object-center mb-4"
                  src="https://images.unsplash.com/photo-1618284554746-71a7b3e923c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                  width={400}
                  height={400}
                />
                <div className="w-full">
                  <h2 className="title-font font-bold text-3xl text-orange-600">
                    Ben Thornhill
                  </h2>
                  <h3 className="text-gray-300 font-bold mb-3">Senior Software Engineer</h3>
                  <span className="inline-block h-1 w-32 rounded bg-orange-600 mb-3"></span>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quas dicta soluta et mollitia adipisci amet exercitationem
                    atque optio facere nobis, aspernatur incidunt eius quaerat
                    quia officiis dolore? Similique, enim placeat!
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <Image
                  className="flex-shrink-0 rounded-2xl w-full  object-cover object-center mb-4"
                  src="https://live.staticflickr.com/65535/52739326443_17987f149e_o.jpg"
                  width="2667"
                  height="4000"
                  alt="Profile Pic"
                />

                <div className="w-full">
                  <h2 className="title-font font-bold text-3xl text-orange-600">
                    Luke Passey
                  </h2>
                  <h3 className="text-gray-300 font-bold mb-3">
                    Full Stack Web Developer
                  </h3>
                  <span className="inline-block h-1 w-32 rounded bg-orange-600 mb-3"></span>
                  <p className="mb-4">
                    I'm Luke Passey, a dedicated Full-Stack Web Developer
                    specializing in React and JavaScript. My proficiency extends
                    to a range of modern development tools and technologies that
                    are integral to full stack development. I'm driven by a love
                    for coding and an insatiable curiosity that keeps me at the
                    forefront of this rapidly evolving field. My approach
                    focuses on creating efficient, user-friendly solutions that
                    prioritize user experience, leveraging my skills in React,
                    JavaScript, and other full stack technologies. Currently
                    based in Utah, I'm actively seeking professional
                    opportunities to apply my expertise and make meaningful
                    contributions to the software engineering industry.
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="p-4 lg:w-1/4 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <Image
                  alt="team"
                  className="flex-shrink-0 rounded-2xl w-full  object-cover object-center mb-4"
                  src="https://images.unsplash.com/photo-1620399909663-b7a7da934161?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjE5fDExMTkxNDEyfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                  width={400}
                  height={400}
                />
                <div className="w-full">
                  <h2 className="title-font font-bold text-lg text-orange-600">
                    Henry Letham
                  </h2>
                  <h3 className="text-gray-300 mb-3">UI Developer</h3>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quas dicta soluta et mollitia adipisci amet exercitationem
                    atque optio facere nobis, aspernatur incidunt eius quaerat
                    quia officiis dolore? Similique, enim placeat!
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/4 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <Image
                  alt="team"
                  className="flex-shrink-0 rounded-2xl w-full  object-cover object-center mb-4"
                  src="https://images.unsplash.com/photo-1592240017316-c351f862580d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                  width={400}
                  height={400}
                />
                <div className="w-full">
                  <h2 className="title-font font-bold text-lg text-orange-600">
                    Henry Letham
                  </h2>
                  <h3 className="text-gray-300 mb-3">UI Developer</h3>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quas dicta soluta et mollitia adipisci amet exercitationem
                    atque optio facere nobis, aspernatur incidunt eius quaerat
                    quia officiis dolore? Similique, enim placeat!
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

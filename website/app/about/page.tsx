import Image from "next/image";
import benProfilePic from "../../public/ben-thornhill.jpg"

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
              Our primary focus revolves around harnessing the potential of emerging
              AI technologies to create innovative solutions to the problems our customers
              face. With a strong commitment to excellence and a passion for pushing
              the boundaries of technology, we take pride in transforming complex challenges
              into successful outcomes for our clients.
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="p-4  md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <Image
                  alt="team"
                  className="flex-shrink-0 rounded-2xl w-full  object-cover object-center mb-4"
                  src={benProfilePic}
                  width={400}
                  height={400}
                />
                <div className="w-full">
                  <h2 className="title-font font-bold text-3xl text-orange-600">
                    Ben Thornhill
                  </h2>
                  <h3 className="text-gray-300 font-bold mb-3">
                    Senior Software Engineer
                  </h3>
                  <span className="inline-block h-1 w-32 rounded bg-orange-600 mb-3"></span>
                  <p className="mb-4">
                    I am an experienced software with a wealth of experience
                    in the tech industry. Throughout my career, I have worked across industries,
                    teams, and technologies to deleiver high quality software solutions.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <Image
                  className="flex-shrink-0 rounded-2xl w-full  object-cover object-center mb-4"
                  src="https://live.staticflickr.com/65535/52739326443_17987f149e_o.jpg"
                  width={2667}
                  height={4000}
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
                    I am Luke Passey, a dedicated Full-Stack Web Developer
                    specializing in React and JavaScript. My proficiency extends
                    to a range of modern development tools and technologies that
                    are integral to full stack development. I am driven by a love
                    for coding and an insatiable curiosity that keeps me at the
                    forefront of this rapidly evolving field. My approach
                    focuses on creating efficient, user-friendly solutions that
                    prioritize user experience, leveraging my skills in React,
                    JavaScript, and other full stack technologies. Currently
                    based in Utah, I am actively seeking professional
                    opportunities to apply my expertise and make meaningful
                    contributions to the software engineering industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

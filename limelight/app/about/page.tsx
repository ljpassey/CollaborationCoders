import Image from "next/image";
import benProfilePic from "../../public/ben-thornhill.jpg";

const About = () => {
  return (
    <div className="flex w-full content-center justify-center align-middle">
      <div className="w-full sm:mx-10 mx-5 rounded-2xl bg-opacity-70 bg-black  flex flex-col h-fit justify-center px-10">
        <section className="text-white body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h1 className="text-3xl font-bold title-font mb-4 text-green-800">
                About Us
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Eligendi, dignissimos molestias eius, fugit, rem nihil numquam
                doloribus velit nemo dolorum possimus repudiandae laboriosam
                labore voluptatibus id voluptatum saepe ut ab!
              </p>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                aut numquam sed consequatur voluptatibus, perspiciatis deserunt
                unde vel, eum hic asperiores iure omnis at eveniet molestias, ad
                odio libero illo.
              </p>
            </div>
            <div className="flex flex-col text-center w-full mb-20">
              <h1 className="text-3xl font-bold title-font mb-4 text-green-800">
                Services
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam non
                soluta fuga adipisci, omnis unde dolores voluptatibus illum
                voluptas magni, corporis quod beatae quia! Ipsam fuga animi
                beatae cum quos! Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Nobis earum, asperiores sint dolore nam eos
                sunt quidem ipsam id tenetur eum sed dicta fugit ut, fuga animi
                beatae, exercitationem impedit.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

import React from "react";

import BlogCard from "@/components/BlogCard";
import Link from "next/link";

const Home = () => {
  return (
    <section>
      <strong>
        <h1>Welcome to Collaboration Coders!</h1>
      </strong>
      <article>
        <h3>What is Collaboration Coders?</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, optio
          cupiditate quod beatae ratione dolore dignissimos culpa id soluta
          totam. Eaque facere deserunt excepturi numquam at provident incidunt
          velit animi.
        </p>
        <nav>
          <Link href="/about">Learn more about us</Link>
        </nav>
      </article>
      <article>
        <h3>View our most recent Blog post</h3>
        <BlogCard />
      </article>
    </section>
  );
};

export default Home;

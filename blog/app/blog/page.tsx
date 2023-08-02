import React from "react";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { getPages } from "@/utils/notion";

const prisma = new PrismaClient();

async function getData() {
  const users = await prisma.user.findMany();
  const posts = await prisma.post.findMany();

  return JSON.stringify({ users, posts });
}

// TODO - get strongly typed users
export default async function Page() {
  const data = await getData();
  const { users, posts } = JSON.parse(data);
  const userOne = users[0];

  return (
    <section>
      <h1>Blog Posts</h1>
      
      <Link href={`/blog/first-post`}>
        <>First Post</>
      </Link>
    </section>
  );
}

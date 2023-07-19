import React from "react";
import BlogCard from "@/components/BlogCard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function getData() {
  const users = await prisma.user.findMany()
  const posts = await prisma.post.findMany()

  return JSON.stringify({ users, posts })
}

// TODO - get strongly typed users
export default async function Page() {
  const data = await getData();
  const {users, posts} = JSON.parse(data)
  const userOne = users[0]

  return (
    <section>
      <h1>Blog</h1>
      <h2>{userOne.name}</h2>
    </section>
  );
}

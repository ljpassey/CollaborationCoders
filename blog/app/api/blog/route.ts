import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const GET = async () => {
    const users = await prisma.user.findMany()
    console.log('users :>> ', users);
}
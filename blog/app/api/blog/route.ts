import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const GET = async (request: any, response: any) => {
    const users = await prisma.user.findMany()
    console.log('users :>> ', users);

    // Return response code
    return new Response(JSON.stringify(users), { status: 200 })
}
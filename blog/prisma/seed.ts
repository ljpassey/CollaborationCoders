import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const ben = await prisma.user.upsert({
        where: { email: 'ben@prisma.io' },
        update: {},
        create: {
            email: 'ben@prisma.io',
            name: 'Ben',
            posts: {
                create: {
                    title: 'Check out Prisma with Next.js',
                    content: 'https://www.prisma.io/nextjs',
                    published: true,
                },
            },
        },
    })
    const luke = await prisma.user.upsert({
        where: { email: 'luke@prisma.io' },
        update: {},
        create: {
            email: 'luke@prisma.io',
            name: 'Luke',
            posts: {
                create: [
                    {
                        title: 'Follow Prisma on Twitter',
                        content: 'https://twitter.com/prisma',
                        published: true,
                    },
                    {
                        title: 'Follow Nexus on Twitter',
                        content: 'https://twitter.com/nexusgql',
                        published: true,
                    },
                ],
            },
        },
    })
    console.log({ alice: ben, bob: luke })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
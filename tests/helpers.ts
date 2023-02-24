import { prisma } from "../src/configs";

export async function cleanDb() {
    await prisma.credential.deleteMany({})
    await prisma.network.deleteMany({})
    await prisma.session.deleteMany({})
    await prisma.user.deleteMany({})

}
import { prisma } from "../src/configs";

export async function cleanDb() {
    await prisma.user.deleteMany({})
    await prisma.credential.deleteMany({})
    await prisma.session.deleteMany({})
    await prisma.network.deleteMany({})
}
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { prisma } from "../../src/configs";

export async function createUser() {
    const password = faker.internet.password();
    const hashedPassword = bcrypt.hashSync(password, 10);

    return prisma.user.create({
        data:{
            email: faker.internet.email(),
            password: hashedPassword
        }
    })
}
import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "../../src/configs";
import jwt from "jsonwebtoken"

export async function createUser() {
    const password = faker.internet.password();
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await prisma.user.create({
        data:{
            "email": faker.internet.email(),
            "password": hashedPassword
        }
    })
    user.password = password;
    return user
}

async function createValidSession(token: string, userId: number){
    await prisma.session.create({
        data:{
            userId: userId,
            token: token
        }
    })
}

export async function generateValidToken(user: User) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    await createValidSession(token, user.id);
    return token;
  }
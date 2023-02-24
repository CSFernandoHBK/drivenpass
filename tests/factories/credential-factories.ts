import { faker } from '@faker-js/faker';
import { Credential } from '../../src/protocols';
import { prisma } from "../../src/configs";
import { encrypt } from '../../src/tools';

export function generateCredentialBody(): Credential{
    return({
        title: faker.lorem.word(),
        url: faker.internet.url(),
        username: faker.internet.userName(),
        password: faker.internet.password()
    })
}

export async function createCredential(credential: Credential, userId: number){
    const {title, url, username, password} = credential
    return await prisma.credential.create({
        data:{
            title: credential.title,
            url: url,
            username: username,
            password: encrypt(password),
            userId: userId
        }
    })
}


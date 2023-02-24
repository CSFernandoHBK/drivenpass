import { faker } from '@faker-js/faker';
import { Network } from '../../src/protocols';
import { prisma } from "../../src/configs";
import { encrypt } from '../../src/tools';

export function generateNetworkBody(): Network{
    return({
        title: faker.lorem.word(),
        network: faker.lorem.word(),
        password: faker.internet.password()
    })
}

export async function createNetwork(networkData: Network, userId: number){
    const {title, network, password} = networkData;

    return await prisma.network.create({
        data: {
            title: title,
            network: network,
            password: encrypt(password),
            userId: userId
        }
    })
}
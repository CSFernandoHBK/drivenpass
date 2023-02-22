import networkRepository from "../../repositories/network-repository";
import { Network } from "../../protocols";

async function newNetwork(userId: number, networkInfo: Network){
    const result = await networkRepository.newNetwork(userId, networkInfo)
    return result
}

async function findNetwork(networkId: number, userId: number){

}

async function deleteNetwork(networkId: number, userId: number){

}

const networkService = {
    newNetwork,
    findNetwork,
    deleteNetwork
}

export default networkService;
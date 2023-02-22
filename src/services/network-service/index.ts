import networkRepository from "../../repositories/network-repository";
import { Network } from "../../protocols";
import { forbiddenError, notFoundError } from "../../errors";

async function newNetwork(userId: number, networkInfo: Network){
    const result = await networkRepository.newNetwork(userId, networkInfo)
    return result
}

async function findNetwork(networkId: number, userId: number){
    const result = await networkRepository.findNetwork(networkId)
    if(!result){
        throw notFoundError();
    }
    if(result.userId !== userId){
        throw forbiddenError();
    }
    return(result)
}

async function findAllNetwork(userId: number){
    return await networkRepository.findAllNetwork(userId);
}

async function deleteNetwork(networkId: number, userId: number){

}

const networkService = {
    newNetwork,
    findNetwork,
    findAllNetwork,
    deleteNetwork
}

export default networkService;
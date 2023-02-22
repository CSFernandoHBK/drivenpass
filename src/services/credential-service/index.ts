import credentialRepository from "../../repositories/credential-repository";
import { Credential } from "../../protocols";
import { conflictError, notFoundError, forbiddenError } from "../../errors";

async function newCredential(userId: number, credentialInfo: Credential){
    const verifyCredential = await credentialRepository.findCredentialByTitle(credentialInfo.title)

    if(verifyCredential && verifyCredential.userId===userId){
        throw conflictError();
    } 

    const result = await credentialRepository.newCredential(userId, credentialInfo)
    return result
}

async function findCredential(credentialId: number, userId: number){
    const result = await credentialRepository.findCredential(credentialId)
    if(!result){
        throw notFoundError();
    }
    if(result.userId !== userId){
        throw forbiddenError();
    }
    return(result)
}

async function deleteCredential(credentialId: number, userId: number){
    const verifyCredential = await credentialRepository.findCredential(credentialId);

    if(!verifyCredential){
        throw notFoundError();
    }
    if(verifyCredential.userId !== userId){
        throw forbiddenError();
    }

    const result = await credentialRepository.deleteCredential(credentialId);

    return result
}

const credentialService = {
    newCredential,
    findCredential,
    deleteCredential
}

export default credentialService;
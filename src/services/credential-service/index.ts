import credentialRepository from "../../repositories/credential-repository";
import { Credential } from "../../protocols";
import { conflictError, notFoundError, forbiddenError } from "../../errors";

async function newCredential(userId: number, credentialInfo: Credential){
    const verifyCredential = await credentialRepository.findCredentialByTitle(credentialInfo.title)

    console.log(verifyCredential)

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

async function deleteCredential(){

}

const credentialService = {
    newCredential,
    findCredential,
    deleteCredential
}

export default credentialService;
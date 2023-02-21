import credentialRepository from "../../repositories/credential-repository";
import { Credential } from "../../protocols";
import { conflictError, notFoundError } from "../../errors";

async function newCredential(userId: number, credentialInfo: Credential){
    const verifyCredential = await credentialRepository.findCredentialByTitle(credentialInfo.title)

    if(verifyCredential && verifyCredential.userId===userId){
        throw conflictError();
    } 

    const result = await credentialRepository.newCredential(userId, credentialInfo)
    return result
}

async function findCredential(credentialId: number){
    const result = await credentialRepository.findCredential(credentialId)
    if(!result){
        throw notFoundError();
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
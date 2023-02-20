import credentialRepository from "../../repositories/credential-repository";
import { Credential } from "../../protocols";
import { notFoundError } from "../../errors";

async function newCredential(userId: number, credentialInfo: Credential){
    //verificar se esse user já tem alguma com o mesmo titulo
    const verifyCredential = await credentialRepository.findCredentialByTitle(credentialInfo.title) 

    //se não tiver, insere no banco
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
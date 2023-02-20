import { string } from "joi";
import { prisma } from "../../configs";
import { Credential } from "../../protocols";
import { encrypt } from "../../tools";

async function newCredential(userId: number, credentialInfo: Credential){
    const {title, url, username, password} = credentialInfo;
    const encryptedPass = encrypt(password)
    const result = await prisma.credential.create({
        data: {
            title: title,
            url: url,
            username: username,
            password: encryptedPass,
            userId: userId
        }
    })
    return {
        id: result.id,
        title: result.title
    }
}

async function findCredential(credentialId: number){
    const result = await prisma.credential.findFirst({
        where:{
            id: credentialId
        }
    })
    console.log(result)
    return(result)
}

async function findCredentialByTitle(credentialTitle: string){
    const result = await prisma.credential.findFirst({
        where:{
            title: credentialTitle
        }
    })
    return result
}

async function deleteCredential(){

}

const credentialRepository = {
    newCredential,
    findCredential,
    deleteCredential,
    findCredentialByTitle
}

export default credentialRepository;
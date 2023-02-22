import { prisma } from "../../configs";
import { decrypt, encrypt } from "../../tools";
import { Network } from "../../protocols";        

async function newNetwork(userId: number, networkInfo: Network){
    const {title, network, password} = networkInfo;
    const encryptedPass = encrypt(password)
    const result = await prisma.network.create({
        data:{
            title: title,
            network: network,
            password: encryptedPass,
            userId: userId
        }
    })
    return {
        id: result.id,
        title: result.title
    }
}

async function findNetwork(networkId: number){
    const result = await prisma.network.findFirst({
        where:{
            id: networkId
        }
    })

    if(result){
        const decryptedPass = decrypt(result.password);
        result.password = decryptedPass;    
    }

    return(result)
}

async function deleteNetwork(networkId: number){
    const result = await prisma.network.delete({
        where:{
            id: networkId
        }
    })
    return result
}

const networkRepository = {
    newNetwork,
    findNetwork,
    deleteNetwork
}

export default networkRepository;
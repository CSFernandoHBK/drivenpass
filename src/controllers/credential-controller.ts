import { Response } from "express"
import httpStatus from "http-status"
import credentialService from "../services/credential-service";
import { AuthenticatedRequest } from "../middlewares/"
import { Credential } from "../protocols";
import { credentialSchema } from "../schemas";
 

export async function newCredential(req: AuthenticatedRequest, res: Response){
    const {userId} = req;
    const credentialInfo: Credential = req.body;

    const validation = credentialSchema.validate(credentialInfo, {abortEarly: true})

    if(validation.error){
        return res.status(400).send(validation.error.details[0].message)
    }

    try{
        const result = await credentialService.newCredential(userId, credentialInfo)
        return res.status(201).send(result)
    } catch(err){
        console.log(err)
        if(err.name==="conflictError"){
            return res.status(409).send(err.message)
        }
        return res.status(500).send(httpStatus["500_MESSAGE"])
    }
}

export async function findCredential(req: AuthenticatedRequest, res: Response){
    const credentialId = req.params.id;
    const {userId} = req;

    if(!credentialId){
        return res.status(400).send("id not sended!")
    }

    try{
        const result = await credentialService.findCredential(Number(credentialId), userId)
        return res.send(result)
    } catch(err){
        console.log(err)
        if(err.name==="NotFoundError"){
            return res.status(404).send(err.message)
        }
        if(err.name==="forbiddenError"){
            return res.status(403).send(err.message)
        }
        return res.status(500).send(httpStatus["500_MESSAGE"])
    }
}

export async function findAllCredential(req: AuthenticatedRequest, res: Response) {
    const {userId} = req;

    try{
        const result = await credentialService.findAllCredential(userId)
        return res.send(result)
    } catch(err){
        console.log(err)
        return res.status(500).send(httpStatus["500_MESSAGE"])
    }
}

export async function deleteCredential(req: AuthenticatedRequest, res: Response){
    const credentialId = req.params.id;
    const {userId} = req;

    if(!credentialId){
        return res.status(400).send("id not sended!")
    }

    try{
        const result = await credentialService.deleteCredential(Number(credentialId), userId)
        
        return res.sendStatus(204)
    } catch(err){
        console.log(err)
        if(err.name==="NotFoundError"){
            return res.status(404).send(err.message)
        }
        if(err.name==="forbiddenError"){
            return res.status(403).send(err.message)
        }
        return res.status(500).send(httpStatus["500_MESSAGE"])
    }
}
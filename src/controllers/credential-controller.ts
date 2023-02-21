import { Request, Response } from "express"
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
        return res.status(422).send(validation.error.details[0].message)
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

export async function findCredential(req: Request, res: Response){
    const credentialId = req.params.id;

    if(!credentialId){
        return res.status(400).send("id not sended!")
    }

    try{
        const result = await credentialService.findCredential(Number(credentialId))
        return res.send(result)
    } catch(err){
        console.log(err)
        if(err.name==="NotFoundError"){
            return res.status(404).send(err.message)
        }
        return res.status(500).send(httpStatus["500_MESSAGE"])
    }
}

export async function deleteCredential(req: Request, res: Response){

    try{

    } catch(err){
        console.log(err)
        return res.status(500).send(httpStatus["500_MESSAGE"])
    }
}
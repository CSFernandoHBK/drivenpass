import { Response } from "express"
import httpStatus from "http-status"
import { AuthenticatedRequest } from "../middlewares"
import { networkSchema } from "../schemas";
import { Network } from "../protocols";
import networkService from "../services/network-service"


export async function newNetwork(req: AuthenticatedRequest, res: Response){
    const {userId} = req;
    const networkInfo: Network = req.body;

    const validation = networkSchema.validate(networkInfo, {abortEarly: true})

    if(validation.error){
        return res.status(400).send(validation.error.details[0].message)
    }

    try{
        const result = await networkService.newNetwork(userId, networkInfo)
        return res.status(201).send(result)
    } catch(err){
        console.log(err)
        return res.status(500).send(httpStatus["500_MESSAGE"])
    }
}

export async function findNetwork(req: AuthenticatedRequest, res: Response){
    const networkId = req.params.id;
    const {userId} = req;

    try{
        const result = await networkService.findNetwork(Number(networkId), userId)
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

export async function findAllNetwork(req: AuthenticatedRequest, res: Response) {
    const {userId} = req;

    try{
        const result = await networkService.findAllNetwork(userId)
        return res.send(result)
    } catch(err){
        console.log(err)
        return res.status(500).send(httpStatus["500_MESSAGE"])
    }
}

export async function deleteNetwork(req: AuthenticatedRequest, res: Response){
    const networkId = req.params.id;
    const {userId} = req;

    if(!networkId){
        return res.status(400).send("id not sended!")
    }

    try{
        const result = await networkService.deleteNetwork(Number(networkId), userId)
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
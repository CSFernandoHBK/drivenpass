import { Request, Response } from "express"
import httpStatus from "http-status"
import networkService from "../services/network-service"


export async function newNetwork(req: Request, res: Response){

    try{
        const result = await networkService.newNetwork()
        return res.send(result)
    } catch(err){
        console.log(err)
        return res.status(500).send(httpStatus["500_MESSAGE"])
    }
}

export async function findNetwork(req: Request, res: Response){

    try{
        const result = await networkService.findNetwork()
        return res.send(result)
    } catch(err){
        console.log(err)
        return res.status(500).send(httpStatus["500_MESSAGE"])
    }
}

export async function deleteNetwork(req: Request, res: Response){

    try{
        const result = await networkService.deleteNetwork()
        return res.send(result)
    } catch(err){
        console.log(err)
        return res.status(500).send(httpStatus["500_MESSAGE"])
    }
}
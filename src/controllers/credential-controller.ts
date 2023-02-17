import { Request, Response } from "express"
import httpStatus from "http-status"
import { AuthenticatedRequest } from "../middlewares/"
 

export async function newCredential(req: AuthenticatedRequest, res: Response){
    const {userId} = req;

    try{
        return res.send("tudo ok")
    } catch(err){
        console.log(err)
        return res.status(500).send(httpStatus["500_MESSAGE"])
    }
}

export async function findCredential(req: Request, res: Response){

    try{

    } catch(err){
        console.log(err)
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
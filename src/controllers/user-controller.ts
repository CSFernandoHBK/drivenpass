import { Request, Response } from "express";
import httpStatus from "http-status";
import userService from "../services/user-service";


export async function signUp(req: Request, res: Response){
    const user: userInfo = req.body;

    try{
        const {email, password} = user;

        const emailExists = await userService.verifyEmail(email);
        if(!emailExists){
            return res.status(404).send("E-mail not found!")
        }

        const result = await userService.signUp(email, password)

        return res.status(201)
    } catch(err){
        console.log(err);
        return res.status(500).send(httpStatus["500_MESSAGE"])
    }
}


export async function signIn(req: Request, res: Response) {
    const user: userInfo = req.body;

    try{
        const {email, password} = user;
        const emailExists = await userService.verifyEmail(email)
        if(!emailExists){
            return res.status(404).send("E-mail not found!")
        }
        const token = await userService.signIn(email, password)

        return res.send(token)
    } catch(err){
        if(err.name==="InvalidCredentialsError"){
            return res.status(401).send(err.message)
        }
        console.log(err);
        return res.status(500).send(httpStatus["500_MESSAGE"])
    }
}

type userInfo = {
    email: string,
    password: string
}
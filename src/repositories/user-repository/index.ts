import { prisma } from "../../configs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { invalidCredentialsError } from "../../services/user-service/errors";

async function signIn(email: string, password: string) {
    const userInfo = await verifyEmail(email);
    
    const isPasswordOk = bcrypt.compareSync(password, userInfo.password)

    if(!isPasswordOk){
        throw invalidCredentialsError()
    }

    const token = await createSession(userInfo.id)
    await prisma.session.create({
        data:{
            userId: userInfo.id,
            token: token
        }
    })
    return(token)
}

async function createSession(userId: number) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    return(token)
}

async function verifyEmail(email: string){
    return await prisma.user.findFirst({
        where:{
            email: email
        }
    })
}

async function signUp(email: string, password: string) {
    const passwordHash = bcrypt.hashSync(password, 10);

    return await prisma.user.create({
        data: {
            email: email,
            password: passwordHash
        }
    })
}

const userRepository = {
    signIn,
    signUp,
    verifyEmail
}

export default userRepository;
import userRepository from "../../repositories/user-repository";


async function signIn(email: string, password: string){
    return await userRepository.signIn(email, password);
}

async function verifyEmail(email: string) {
    return await userRepository.verifyEmail(email);
}

async function signUp(email: string, password: string){
    const request = await userRepository.signUp(email, password)
    console.log(request)
    return (request)
}

const userService = {
    signIn,
    signUp,
    verifyEmail
}

export default userService;
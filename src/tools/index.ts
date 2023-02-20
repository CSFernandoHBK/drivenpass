import dotenv from 'dotenv'
import Cryptr from 'cryptr'

dotenv.config()

export function encrypt(password: string){
    const Cryptr = require('cryptr')
    const crypt = new Cryptr(process.env.CRYPT_KEY)
    return(crypt.encrypt(password))
}

export function decrypt(encryptedPass: string){
    const Cryptr = require('cryptr')
    const crypt = new Cryptr(process.env.CRYPT_KEY)
    return(crypt.decrypt(encryptedPass))
}
import joi from "joi";

export const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
})

export const credentialSchema = joi.object({
    title: joi.string().required(),
    url: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required(),
})

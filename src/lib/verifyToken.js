import { jwtVerify, SignJWT } from "jose";

export function getJwtSecretKey(){
    let secret=process.env.SECRET

    if(secret) return secret
    throw new Error("No SECRET KEY is provided!")
}

export default async function verifyToken(token) {
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()))
        return verified.payload
    } catch (error) {
        console.log({Error:error.message})
        return error.message
    }
}
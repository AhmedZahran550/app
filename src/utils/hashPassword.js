import { compareSync, hashSync } from "bcrypt";



export const  getHashed = (data ='' , saltRounds = process.env.SALT_ROUND )=>{
    return hashSync(data , parseInt(saltRounds))
}


export const  getCompered = (plaintext='', hashed='')=>{
    return compareSync(plaintext , hashed)
}
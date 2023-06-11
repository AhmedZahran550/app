import jwt from 'jsonwebtoken';


export const  genToken =({data , signature=process.env.TOKEN_SIGNATURE }={})=>{
  return jwt.sign(data,signature);
} 
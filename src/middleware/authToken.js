
import { asyncHandler } from './errorHandling.js';
import { productModel } from './../../DB/models/product/product.model.js';
import { adminModel } from './../../DB/models/admin/admin.model.js';
import  jwt  from 'jsonwebtoken';

export const adminSession =asyncHandler(async(req,res,next)=>{
    if (!req.session.admin) {
        return next(new Error("login first"));
    }
    const admin = await adminModel.findById(req.session?.admin?.id);
    if (!admin) {
        return next(new Error("in-valid Admin"));
    }
    req.admin = admin; 
    return next();
})


export const adminToken =asyncHandler(async(req,res,next)=>{
    const { authorization } = req.headers;
    if (!authorization?.startsWith(process.env.BEARER)) {
        return next(new Error("in-valid Bearer token"));
    }
    const token = authorization.split(process.env.BEARER)[1];
    if (!token) {
        return next(new Error('in-valid token'));
    }
    const decoded = jwt.verify(token, process.env.ADMIN_TOKEN_SIGNATURE);
    if (!decoded?.id) {
        return next(new Error(" in-valid payload "));
    }
    const admin = await adminModel.findById(decoded?.id);
    if (!admin) {
        return next(new Error("in-valid Admin"));
    }
    req.admin = admin; 
    return next();
    
})

     


export const productToken =asyncHandler(async(req,res,next)=>{
    const { authorization } = req.headers;
    if (!authorization?.startsWith(process.env.BEARER)) {
        return next(new Error("in-valid Bearer token"));
    }
    const token = authorization.split(process.env.BEARER)[1];
    if (!token) {
        return next(new Error('in-valid token'));
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE);
    if (!decoded?.id) {
        return next(new Error(" in-valid payload "));
    }
    const product = await productModel.findById(decoded?.id);
    if (!product) {
        return next(new Error("product does`t exist "));
    }
    req.product = product;
    return next();
})
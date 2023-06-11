
import mongoose, { model, Schema, Types } from "mongoose";

const schema = new Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    adminId:{
        type:Types.ObjectId,
        ref:"Admin",
        required: true,
    },
    password:{
        type:String ,
        required:true
    }
},
    {
        timestamps: true
    });


export const productModel = mongoose.models.Product || model("Product", schema);

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
    },
    refresh:{
        type:Boolean,
        default:false
    },
    close:{
        type:Boolean,
        default:false
    },
     restart:{
        type:Boolean,
        default:false
     },
     restartWithCode:{
        type:Boolean,
        default:false
     }
     
},
    {
        timestamps: true
    });


export const productModel = mongoose.models.Product || model("Product", schema);
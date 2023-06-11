
import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    email: {
        type:String,
        require:true ,
        unique:true
    },
    password: {
        type:String,
        require:true ,
    },
},{
    timestamps:true ,
});


export const adminModel =mongoose.models.Admin || mongoose.model('Admin', adminSchema);


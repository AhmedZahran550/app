
import mongoose, { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    length: {
      type: Number,
      required: true,
    },
    productId: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    path:{
      secure_url:{
        type:String,
        required:true
      },
      public_id:{
        type:String,
        required:true
      }
    }
  },
  {
    timestamps: true,
  }
);




export const codeModel = mongoose.models.Code || model("Code", schema);

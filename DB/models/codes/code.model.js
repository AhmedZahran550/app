
import mongoose, { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    characters: {
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
    fileUrl:{
      type:String ,
      required:true
    }
  },
  {
    timestamps: true,
  }
);

export const codeModel = mongoose.models.Code || model("Code", schema);

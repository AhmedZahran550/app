import { codeModel } from "../../../../DB/models/codes/code.model.js";
import { productModel } from "../../../../DB/models/product/product.model.js";
import { asyncHandler } from "../../../middleware/errorHandling.js";
import { genToken } from "../../../utils/generateToken.js";
import { getCompered } from "../../../utils/hashPassword.js";

// login API

export const login = asyncHandler(async (req, res, next) => {
  const { productId, password } = req.body;
  let product = await productModel.findOne({
    productId: productId.toLowerCase(),
  });
  if (!product) {
    return next(new Error("in-valid product Id", { cause: 404 }));
  }
  if (!getCompered(password, product.password)) {
    return next(new Error("in-valid password", { cause: 409 }));
  }
  if (product.codeId) {
    product = await productModel
      .findByIdAndUpdate(
        product._id,
        {
          $unset: { refresh: 1, close: 1, restart: 1, codeId: 1 },
        },
        { code: 1, refresh: 1, restart: 1 }
      )
      .populate("codeId");
    const data = {
      close: product.close,
      refresh: product.refresh,
      restart: product.restart,
      restartWithCode: true,
      length: product.codeId.length,
      text: product.codeId.text,
    };
    return res.json({ ...data });
  }
  product = await productModel.findByIdAndUpdate(product._id, {
    refresh: false,
    close: false,
    restart: false,
  });
  const data = {
    close: product.close,
    refresh: product.refresh,
    restart: product.restart,
    restartWithCode: false,
  };
  return res.json({ ...data });
});

import { productModel } from "../../../../DB/models/product/product.model.js";
import { asyncHandler } from "../../../middleware/errorHandling.js";
import { getCompered } from "../../../utils/hashPassword.js";

const getCode = (round = 0, text) => {
  const arr = text.split("\n");
  const roundCont = Math.floor(arr.length / 100 + 1);
  return {
    code: arr
      .slice(round * 100, round * 100 + 100)
      .join("\n")
      .concat("\n"),
    roundCont,
  };
};

export const login = asyncHandler(async (req, res, next) => {
  const { productId, password, round, done } = req.body;
  let product = await productModel.findOne({
    productId: productId.toLowerCase(),
  });
  if (!product) {
    return next(new Error("in-valid product Id", { cause: 404 }));
  }
  if (!getCompered(password, product.password)) {
    return next(new Error("in-valid password", { cause: 409 }));
  }
  if (done) {
    await productModel.updateOne(
      {
        _id: product._id,
      },
      {
        $unset: { refresh: 1, restart: 1, restartWithCode: 1 },
      }
    );
  }
  product = await productModel
    .findById(product._id, {
      code: 1,
      refresh: 1,
      restart: 1,
      restartWithCode: 1,
      turnOn: 1,
      turnOff: 1,
    })
    .populate("codeId");
  const { code, roundCont } = getCode(round || 0, product.codeId.text);
  const data = {
    turnOn: product.turnOn,
    turnOff: product.turnOff,
    refresh: product.refresh,
    restart: product.restart,
    restartWithCode: product.restartWithCode,
    length: code.length,
    roundCont,
    round: round ?? 0,
    code,
  };
  return res.json({ ...data });
});

import { errRes } from "../../../../src/utils/err";
import Product from "../../../../src/db/product";

export default async function oprator(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const product = await Product.findOne({
          where: {
            nomor: req.query.nomor,
          },
        });
        if (!product) return errRes(400, res, "data not font");

        res.status(200).json({
          product,
        });
      } catch (err) {
        throw err;
      }
    default:
      res.status(404).end();
  }
}

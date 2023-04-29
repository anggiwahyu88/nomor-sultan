import { errRes } from "../../../../src/utils/err";
import Product from "../../../../src/db/product";

export default async function oprator(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const product = await Product.findAll({
          where: {
            oprator: req.query.oprator,
          },
          attributes: ["nomor", "oprator", "harga"],
        });
        if (!product[0]) return errRes(400, res, "data not font");

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

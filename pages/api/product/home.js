import { errRes } from "../../../src/utils/err";
import Product from "../../../src/db/product";

export default async function home(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const product = await Product.findAll({
          where: {
            promoId: "0",
            promo: "false",
          },
          attributes: ["nomor", "oprator", "harga"],
        });
        if (!product[0]) return errRes(400, res, "product not font");

        res.status(200).json({
          products: product,
        });
      } catch (err) {
        throw err;
      }
    default:
      res.status(404).end();
  }
}

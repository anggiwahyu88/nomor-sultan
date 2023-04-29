import { errRes } from "../../../../src/utils/err";
import Product from "../../../../src/db/product";

export default async function terbaik(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const products = await Product.findAll({
          where: {
            jenisProduk: req.query.jenisProduct,
          },
          attributes: ["nomor", "oprator", "harga"],
        });
        if (!products[0]) return errRes(400, res, "data not font");

        res.status(200).json({
          products,
        });
      } catch (err) {
        throw err;
      }
    default:
      res.status(404).end();
  }
}

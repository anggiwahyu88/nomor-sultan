import { errRes } from "../../../src/utils/err";
import { Op } from "sequelize";
import Product from "../../../src/db/product";

export default async function oprator(req, res) {
  switch (req.method) {
    case "PUT":
      const { nomor, oprator, kategori, digit } = req.body;
      let params = "";
      if (req.query.type === "DESC" || req.query.type === "ASC") {
        params = [["harga", req.query.type]];
      }

      try {
        const product = await Product.findAll({
          where: {
            nomor: { [Op.substring]: `%${nomor}%` },
            oprator: { [Op.substring]: `%${oprator}%` },
            kategori: { [Op.substring]: `%${kategori}%` },
            digit: { [Op.substring]: `%${digit}%` },
          },
          attributes: ["nomor", "oprator", "harga"],
          order: params,
        });
        if (!product[0]) return errRes(400, res, "data not fount");

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

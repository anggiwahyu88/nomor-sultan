const sequelize = require("../../src/db/db");
import { errRes } from "../../src/utils/err";
import Product from "../../src/db/product";
const { Op } = require("sequelize");

export default async function product(req, res) {
  switch (req.method) {
    case "GET":
      const product = await Product.findAll({
        where: {
          jenisProduk: {
            [Op.ne]: "false",
          },
        },
        attributes: [
          [
            sequelize.fn("DISTINCT", sequelize.col("jenisProduk")),
            "jenisProduk",
          ],
        ],
      });
      if (!product[0]) return errRes(400, res, "data not font");

      res.status(200).json({
        product,
      });
    default:
      res.status(404).end();
  }
}

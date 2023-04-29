const sequelize = require("../../../../src/db/db");
import { checkAccessToken } from "../../../../src/utils/check-access-token";
import { errRes } from "../../../../src/utils/err";
import Product from "../../../../src/db/product";
import Promo from "../../../../src/db/promo";

export default async function remove(req, res) {
  switch (req.method) {
    case "DELETE":
      const transaction = await sequelize.transaction();
      try {
        const { promoId } = req.body;
        if (!promoId) return errRes(400, res, "please fill the form correctly");
        const accesstoken = req?.headers?.authorization?.split(" ")[1] || null;

        const tokenValidate = await checkAccessToken(accesstoken);
        if (!tokenValidate) return res.status(401).end();

        const product = await Product.findAll({
          where: {
            promoId: promoId,
          },
        });

        if (product[0]) {
          let isValid;
          isValid = await Product.update(
            {
              promoId: 0,
              promo: "false",
            },
            {
              where: {
                nomor: [
                  product[0].nomor,
                  product[1].nomor,
                  product[2]?.nomor || null,
                ],
              },
              transaction: transaction,
            }
          );
          
          if (isValid[0] === 0) throw Error;

          isValid = await Promo.destroy({
            where: { promoId: promoId },
            force: true,
            transaction: transaction,
          });
          if (isValid[0] === 0) throw Error;

          await transaction.commit();
          res.status(200).json({ message: "succses" });

        } else {
          return errRes(400, res, "promo tidak ditemukan");
        }
      } catch (err) {
        await transaction.rollback();
        return errRes(400, res, "something wrong");
      }
    default:
      res.status(404).end();
  }
}

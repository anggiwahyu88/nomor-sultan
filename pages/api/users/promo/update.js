const sequelize = require("../../../../src/db/db");
import { checkAccessToken } from "../../../../src/utils/check-access-token";
import { getPromoId } from "../../../../src/utils/get-promo-id";
import { errRes } from "../../../../src/utils/err";
import Product from "../../../../src/db/product";
import Promo from "../../../../src/db/promo";

function uploadValidation(nomor1, nomor2, nomor3, harga, promo, promoId) {
  if (!nomor1 || !nomor2 || !nomor3 || !harga || !promo || !promoId)
    return false;
  else return true;
}

export default async function update(req, res) {
  switch (req.method) {
    case "PUT":
      const transaction = await sequelize.transaction();
      try {
        const { nomor1, nomor2, nomor3, promo, harga, promoId } = req.body;
        const accesstoken = req?.headers?.authorization?.split(" ")[1] || null;

        const tokenValidate = await checkAccessToken(accesstoken);
        if (!tokenValidate) return res.status(401).end();

        const formValidation = uploadValidation(
          nomor1,
          nomor2,
          nomor3,
          promo,
          harga,
          promoId
        );
        if (!formValidation)
          return errRes(400, res, "please fill the form correctly");

        const oldProduct = await Product.findAll({
          where: {
            promoId: promoId,
          },
        });
        const newPromoId = await getPromoId(
          nomor1,
          nomor2,
          nomor3,
          promo,
          promoId
        );

        if (oldProduct[0] && newPromoId) {
          let isValid;
          isValid = await Product.update(
            {
              promoId: 0,
              promo: "false",
            },
            {
              where: {
                nomor: [
                  oldProduct[0].nomor,
                  oldProduct[1].nomor,
                  oldProduct[2]?.nomor || null,
                ],
              },
              transaction: transaction,
            }
          );
          if (isValid[0] === 0) throw Error;

          isValid = await Product.update(
            {
              promoId: newPromoId,
              promo: promo,
              harga: harga,
            },
            {
              where: { nomor: [nomor1, nomor2, nomor3] },
              transaction: transaction,
            }
          );
          if (isValid[0] === 0)  throw Error;

          isValid = await Promo.update(
            {
              nomor1: nomor1,
              nomor2: nomor2,
              nomor3: nomor3,
              harga: harga,
              promoId: newPromoId,
              promo: promo,
            },
            {
              where: {
                promoId: promoId,
              },
              transaction: transaction,
            }
          );
          if (isValid[0] === 0) throw Error;

          await transaction.rollback();
          res.status(200).json({ message: "succses" });

        } else {
          throw Error;
        }
      } catch (err) {
        await transaction.rollback();
        return errRes(400, res, "something wrong");
      }
    default:
      res.status(404).end();
  }
}

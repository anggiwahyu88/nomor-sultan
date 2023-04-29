const sequelize = require("../../../../src/db/db");
import { checkAccessToken } from "../../../../src/utils/check-access-token";
import { getPromoId } from "../../../../src/utils/get-promo-id";
import { errRes } from "../../../../src/utils/err";
import Product from "../../../../src/db/product";
import Promo from "../../../../src/db/promo";

function uploadValidation(nomor1, nomor2, nomor3, harga, promo) {
  if (!nomor1 || !nomor2 || !nomor3 || !harga || !promo) return false;
  else return true;
}

export default async function upload(req, res) {
  switch (req.method) {
    case "POST":
      const transaction = await sequelize.transaction();
      try {
        const { nomor1, nomor2, nomor3, promo, harga } = req.body;
        const accesstoken = req?.headers?.authorization?.split(" ")[1] || null;

        const tokenValidate = await checkAccessToken(accesstoken);
        if (!tokenValidate) return res.status(401).end();

        const formValidation = uploadValidation(
          nomor1,
          nomor2,
          nomor3,
          promo,
          harga
        );
        if (!formValidation)
          return errRes(400, res, "please fill the form correctly");

        const promoId = await getPromoId(nomor1, nomor2, nomor3, promo);
        if (!promoId) throw Error;

        let isValid;
        isValid = await Product.update(
          {
            promoId: promoId,
            promo: promo,
            harga: harga,
          },
          {
            where: { nomor: [nomor1, nomor2, nomor3] },
            transaction: transaction,
          }
        );
        if (isValid[0] === 0) throw Error;

        isValid = await Promo.create(
          {
            nomor1,
            nomor2,
            nomor3,
            harga,
            promoId,
            promo,
          },
          {
            transaction: transaction,
          }
        );
        if (isValid[0] === 0) throw Error;

        res.status(200).json({ message: "succses" });
      } catch (err) {
        await transaction.rollback();
        return errRes(400, res, err?.errors[0]?.message || "updete failed");
      }
    default:
      res.status(404).end();
  }
}

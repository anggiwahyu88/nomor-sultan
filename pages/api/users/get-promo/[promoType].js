import { checkAccessToken } from "../../../../src/utils/check-access-token";
import { errRes } from "../../../../src/utils/err";
import Promo from "../../../../src/db/promo";

export default async function getPromo(req, res) {
  try {
    const accesstoken = req?.headers?.authorization?.split(" ")[1] || null;
    const tokenValidate = await checkAccessToken(accesstoken);
    if (!tokenValidate) return res.status(401).end();

    const product = await Promo.findAll({
      where: {
        promo: req.query.promoType,
      },
      attributes: ["nomor1", "nomor2", "nomor3", "promo", "promoId", "harga"],
    });
    if (!product[0]) return errRes(400, res, "data not fount");

    res.status(200).json({
      product,
    });
  } catch (err) {
    throw err;
  }
}

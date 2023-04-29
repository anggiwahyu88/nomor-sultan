import { checkAccessToken } from "../../../../src/utils/check-access-token";
import { errRes } from "../../../../src/utils/err";
import Product from "../../../../src/db/product";

export default async function remove(req, res) {
  switch (req.method) {
    case "DELETE":
      try {
        const accesstoken = req?.headers?.authorization?.split(" ")[1] || null;
        const tokenValidate = await checkAccessToken(accesstoken);
        if (!tokenValidate) return res.status(401).end();

        const product = await Product.destroy({
          where: {
            nomor: req.query.nomor,
          },
          force: true,
        });
        if (product == 0) return errRes(400, res, "data not found");
        
        res.status(200).json({
          message: "succsses",
        });
      } catch (err) {
        throw err;
      }
    default:
      res.status(404).end();
  }
}

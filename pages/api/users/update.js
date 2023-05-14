import { checkAccessToken } from "../../../src/utils/check-access-token";
import { cekNomor } from "../../../src/utils/cekNomor";
import { errRes } from "../../../src/utils/err";
import Product from "../../../src/db/product";

function updateValidation(
  id,
  nomor,
  oprator,
  kategori,
  jenisProduk,
  harga,
  asMaduraTarifLama,
  asPlayMania
) {
  if (
    !id ||
    !nomor ||
    !oprator ||
    !kategori ||
    !jenisProduk ||
    !harga ||
    !asMaduraTarifLama ||
    !asPlayMania
  )
    return false;
  else return true;
}

export default async function logout(req, res) {
  switch (req.method) {
    case "PUT":
      try {
        const {
          nomor,
          oprator,
          kategori,
          jenisProduk,
          harga,
          asMaduraTarifLama,
          asPlayMania,
        } = req.body;
        const accesstoken = req?.headers?.authorization?.split(" ")[1] || null;
        const { id } = req.query;

        const tokenValidate = await checkAccessToken(accesstoken);
        if (!tokenValidate) return res.status(401).end();
        
        const nomorValidate = cekNomor(nomor);
        const formValidate = updateValidation(
          id,
          nomor,
          oprator,
          kategori,
          jenisProduk,
          harga,
          asMaduraTarifLama,
          asPlayMania
        );

        if (nomorValidate && formValidate) {
          const product = await Product.update(
            {
              nomor: nomor,
              oprator: oprator,
              kategori: kategori,
              digit: String(nomor.length),
              jenisProduk: jenisProduk,
              harga: harga,
              asMaduraTarifLama: asMaduraTarifLama,
              asPlayMania: asPlayMania,
            },
            { where: { _id: id } }
          );
          if (product[0] === 0) return errRes(400, res, "nomor not found");
          res.status(200).json({ message: "succses" });
        } else {
          return errRes(400, res, "please fill the form correctly");
        }
      } catch (err) {
        return errRes(400, res, err?.errors[0]?.message || "invalid");
      }
    default:
      res.status(404).end();
  }
}

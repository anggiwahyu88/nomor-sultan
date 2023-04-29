import { checkAccessToken } from "../../../src/utils/check-access-token";
import { cekNomor } from "../../../src/utils/cekNomor";
import { errRes } from "../../../src/utils/err";
import Product from "../../../src/db/product";

function uploadValidation(
  nomor,
  oprator,
  kategori,
  jenisProduk,
  harga,
  asMaduraTarifLama,
  asPlayMania
) {
  if (
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

export default async function upload(req, res) {
  switch (req.method) {
    case "POST":
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
        const accessToken = req?.headers?.authorization?.split(" ")[1] || null;
        const tokenValidate = checkAccessToken(accessToken);
        if (!tokenValidate) return res.status(401).end();
        const validate = uploadValidation(
          nomor,
          oprator,
          kategori,
          jenisProduk,
          harga,
          asMaduraTarifLama,
          asPlayMania
        );
        const onNomor = cekNomor(nomor);
        if (onNomor && validate) {
          await Product.create({
            nomor,
            oprator,
            kategori,
            digit: String(nomor.length),
            jenisProduk,
            harga,
            asMaduraTarifLama,
            asPlayMania,
          });
          res.status(200).json({
            message: "succes",
          });
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

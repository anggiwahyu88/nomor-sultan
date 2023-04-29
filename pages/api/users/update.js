import { checkAccessToken } from "../../../src/utils/check-access-token";
import { cekNomor } from "../../../src/utils/cekNomor";
import { errRes } from "../../../src/utils/err";
import Product from "../../../src/db/product";

function updateValidation(
  nomor,
  nomorBaru,
  oprator,
  kategori,
  jenisProduk,
  harga,
  asMaduraTarifLama,
  asPlayMania
) {
  if (
    !nomor ||
    !nomorBaru ||
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
          nomorBaru,
          oprator,
          kategori,
          jenisProduk,
          harga,
          asMaduraTarifLama,
          asPlayMania,
        } = req.body;
        const accesstoken = req?.headers?.authorization?.split(" ")[1] || null;
        const { nomor } = req.query;

        const tokenValidate = await checkAccessToken(accesstoken);
        if (!tokenValidate) return res.status(401).end();
        
        const nomorValidate = cekNomor(nomorBaru);
        const formValidate = updateValidation(
          nomor,
          nomorBaru,
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
              nomor: nomorBaru,
              oprator: oprator,
              kategori: kategori,
              digit: String(nomorBaru.length),
              jenisProduk: jenisProduk,
              harga: harga,
              asMaduraTarifLama: asMaduraTarifLama,
              asPlayMania: asPlayMania,
            },
            { where: { nomor: nomor } }
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

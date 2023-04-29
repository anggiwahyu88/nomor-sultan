import * as yup from "yup";

const schemaAdmind = yup.object({
  nomor: yup
    .string()
    .required("Nomor tidak boleh kosong")
    .matches(/^08[0-9]*$/, {
      message: "Nomor harus diawali dengan 08",
      excludeEmptyString: true,
    })
    .matches(/^08[0-9]{8,10}$/, {
      message: "Nomor harus terdiri dari 10-12 karakter",
      excludeEmptyString: true,
    }),
  harga: yup
    .string()
    .notOneOf(["Rp. "], "Harga tidak boleh diawali dengan Rp. 0")
    .required("Harga tidak boleh kosong"),
  oprator: yup.string().required("Pilih salah satu"),
  kategori: yup.string().required("Pilih salah satu"),
  jenisProduk: yup.string().required("Pilih salah satu"),
  asMaduraTarifLama: yup
    .string()
    .required("Pilih salah satu")
    .oneOf(["true", "false"], "Invalid value for As Madura Tarif Lama"),
  asPlayMania: yup
    .string()
    .required("Pilih salah satu")
    .oneOf(["true", "false"], "Invalid value for As Play Mania"),
});

export default schemaAdmind;

import { useContext, useState, useEffect } from "react";
import { ItemContext } from "../../../utils/provider";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormAsMaduraTarifLama from "../../list-form/form-input-as-madura-tarif-lama";
import FormJenisProduk from "../../list-form/form-input-jenis-produk";
import FormAsPlayMania from "../../list-form/form-input-as-play-mania";
import FormKategori from "../../list-form/form-input-kategori";
import FormOprator from "../../list-form/form-input-oprator";
import FormHarga from "../../list-form/form-input-harga";
import FormNomor from "../../list-form/form-input-nomor";
import schemaAdmind from "../../../utils/schema-admind";
import io from "socket.io-client";

export default function Uplaod({ token }) {
  const { handleFormUpload } = useContext(ItemContext);
  const { axiosJWT } = useContext(ItemContext);
  const [socket, setSocet] = useState();
  const { setLoading } = useContext(ItemContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaAdmind),
  });

  useEffect(() => {
    // setSocet(
    //   io({
    //     pingInterval: 20000,
    //     pingTimeout: 10000,
    //   })
    // );
  }, []);
  const handleUpload = async (data) => {
    setLoading(true);
    try {
      const newPrice = data.harga.replace(/[^0-9]/g, "");
      await axiosJWT.post(
        "/api/users/upload",
        {
          nomor: data.nomor,
          oprator: data.oprator,
          kategori: data.kategori,
          jenisProduk: data.jenisProduk,
          harga: newPrice,
          asMaduraTarifLama: data.asMaduraTarifLama,
          asPlayMania: data.asPlayMania,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // socket.emit("product-update", new Date().getTime());
      toast.success("upload sucses");
    } catch (err) {
      toast.error(err.response.data.error_message);
    } finally {
      handleFormUpload();
      setLoading(false);
    }
  };

  return (
    <div className="container-form">
      <form className="card-form " onSubmit={handleSubmit(handleUpload)}>
        <FormNomor defaultValue={"08"} register={register} errors={errors} />
        <FormHarga register={register} errors={errors} />
        <FormOprator register={register} errors={errors} />
        <FormKategori register={register} errors={errors} />
        <FormJenisProduk register={register} errors={errors} />
        <FormAsMaduraTarifLama register={register} errors={errors} />
        <FormAsPlayMania register={register} errors={errors} />
        <div className="wrapper-btn-form">
          <button type="submit" className="btn-upload">
            Upload
          </button>
          <button
            type="cancel"
            onClick={() => handleFormUpload()}
            className="btn-cancel"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}

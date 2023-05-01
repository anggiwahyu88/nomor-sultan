import { rupiahConvert } from "../../../utils/rupiahConvert";
import { yupResolver } from "@hookform/resolvers/yup";
import { ItemContext } from "../../../utils/provider";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormAsMaduraTarifLama from "../../list-form/form-input-as-madura-tarif-lama";
import FormJenisProduk from "../../list-form/form-input-jenis-produk";
import FormAsPlayMania from "../../list-form/form-input-as-play-mania";
import FormKategori from "../../list-form/form-input-kategori";
import schemaAdmind from "../../../utils/schema-admind";
import FormOprator from "../../list-form/form-input-oprator";
import FormHarga from "../../list-form/form-input-harga";
import FormNomor from "../../list-form/form-input-nomor";

export default function Update({ data, token }) {
  const { handleFormUpdate } = useContext(ItemContext);
  const { axiosJWT } = useContext(ItemContext);
  const { setLoading } = useContext(ItemContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaAdmind),
    defaultValues : {
      oprator: data.oprator,
      kategori: data.kategori,
      jenisProduk: data.jenisProduk,
      harga: rupiahConvert(data.harga),
      asMaduraTarifLama: data.asMaduraTarifLama,
      asPlayMania: data.asPlayMania,
    }
  });

  const handleUpdate = async (dataInput) => {
    setLoading(true);
    try {
      const newPrice = dataInput.harga.replace(/[^0-9]/g, "");
      await axiosJWT.put(
        `/api/users/update?nomor=${data.nomor}`,
        {
          nomorBaru: dataInput.nomor,
          oprator: dataInput.oprator,
          kategori: dataInput.kategori,
          jenisProduk: dataInput.jenisProduk,
          harga: newPrice,
          asMaduraTarifLama: dataInput.asMaduraTarifLama,
          asPlayMania: dataInput.asPlayMania,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("update sucses");
    } catch (err) {
      toast.error(err?.response?.data?.error_message || "something wrong");
    } finally {
      handleFormUpdate();
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axiosJWT.delete(`/api/users/delete/${data.nomor}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("delete sucses");
    } catch {
      toast.error("gagal, coba lagi");
    } finally {
      handleFormUpdate();
      setLoading(false);
    }
  };

  const onSubmit = (data, e) => {
    if (e.nativeEvent.submitter.id === "btn-update") {
      handleUpdate(data);
    } else if (e.nativeEvent.submitter.id === "btn-delete") {
      handleDelete();
    }
  };

  return (
    <div className="container-form " onSubmit={handleSubmit(onSubmit)}>
      <form className="card-form">
        <FormNomor
          defaultValue={data.nomor}
          register={register}
          errors={errors}
        />
        <FormHarga
          defaultValue={data.harga}
          register={register}
          errors={errors}
        />
        <FormOprator
          defaultValue={data.oprator}
          register={register}
          errors={errors}
          setValue={setValue}
        />
        <FormKategori
          defaultValue={data.kategori}
          register={register}
          errors={errors}
          setValue={setValue}
        />
        <FormJenisProduk
          defaultValue={data.jenisProduk}
          register={register}
          errors={errors}
          setValue={setValue}
        />
        <FormAsMaduraTarifLama
          defaultValue={data.asMaduraTarifLama}
          register={register}
          errors={errors}
        />
        <FormAsPlayMania
          defaultValue={data.asPlayMania}
          register={register}
          errors={errors}
        />

        <div className="wrapper-btn-form">
          <button type="submit" className="btn-upload" id="btn-update">
            update
          </button>
          <button className="btn-cancel" onClick={() => handleFormUpdate()}>
            batal
          </button>
          <button type="submit" id="btn-delete">
            hapus
          </button>
        </div>
      </form>
    </div>
  );
}

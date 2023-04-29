import { useForm } from "react-hook-form";
import { ItemContext } from "../../../utils/provider";
import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import FormOprator from "../../list-form/form-input-oprator";
import FormKategori from "../../list-form/form-input-kategori";
import FormDigit from "../../list-form/form-input-digit";
import { useEffect } from "react";

export default function FormFilter({ data }) {
  const { setOnForm } = useContext(ItemContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oprator: data.oprator,
      kategori: data.kategori,
      digit: data.digit,
    },
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const onSubmit = (dataInput) => {
    console.log(dataInput);
    setOnForm(false);
    router.push(
      `/search/?nomor=${data.nomor}&oprator=${dataInput.oprator}&kategori=${dataInput.kategori}&digit=${dataInput.digit}&sort=${data.sort}`
    );
  };
  return (
    <div className="container-form">
      <form className="card-form" onSubmit={handleSubmit(onSubmit)}>
        <FormOprator
          register={register}
          title={"filter"}
          defaultValue={data.oprator}
          setValue={setValue}
        />
        <FormKategori
          register={register}
          title={"filter"}
          defaultValue={data.kategori}
          setValue={setValue}
        />
        <FormDigit register={register} defaultValue={data.digit} setValue={setValue}/>

        <div className="wrapper-btn-form">
          <button className="btn-upload">
            {/* <Link
              href={{
                pathname: "/search",
                query: {
                  nomor: data.nomor,
                  oprator: oprator,
                  kategori: kategori,
                  digit: digit,
                  sort: data.sort,
                },
              }}
              className="h-full w-full flex"
            >
              <span className="m-auto">Filter</span>
            </Link> */}
            Filter
          </button>
          <button className="btn-cancel" onClick={() => setOnForm(false)}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

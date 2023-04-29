import Select from "react-select";

export default function FormJenisProduk({
  defaultValue,
  register,
  errors,
  setValue,
}) {
  const options = [
    { value: "terbaik", label: "Produk Terbaik" },
    { value: "termurah", label: "Produk Termurah" },
    { value: "false", label: "Tidak Keduanya" },
  ];
  const index = options.findIndex((option) => option.value === defaultValue);
  return (
    <>
      <label className="label-form">Jenis produk</label>
      <Select
        options={options}
        onChange={(event) => {
          register("jenisProduk", { value: event.value });
          setValue("jenisProduk", event.value);
        }}
        defaultValue={options[index]}
        className="input-select"
        placeholder="Pilih Jenis Produk"
      />
      {errors.jenisProduk && <span>{errors.jenisProduk.message}</span>}
    </>
  );
}

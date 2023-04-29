import Select from "react-select";

export default function FormOprator({
  defaultValue,
  title,
  register,
  errors,
  setValue,
}) {
  const options = [
    { value: "im3", label: "IM3" },
    { value: "axis", label: "AXIS" },
    { value: "as", label: "AS" },
    { value: "halo", label: "HALO" },
    { value: "simpati", label: "SIMPATI" },
    { value: "xl", label: "XL" },
    { value: "three", label: "THREE" },
    { value: "smartfren", label: "SMARTFREN" },
  ];
  if (title === "filter") {
    options.unshift({ value: "all", label: "All" });
  }
  const index = options.findIndex((option) => option.value === defaultValue);
  const error = errors?.oprator || null

  return (
    <>
      <label className="label-form">Oprator</label>
      <Select
        options={options}
        onChange={(event) => {
          register("oprator", { value: event.value });
          setValue("oprator", event.value);
        }}
        defaultValue={options[index]}
        className="input-select"
        placeholder="Pilih Oprator"
      />
      {error  && <span>{error.message}</span>}
    </>
  );
}

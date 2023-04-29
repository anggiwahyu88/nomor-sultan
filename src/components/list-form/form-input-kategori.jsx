import Select from "react-select";

export default function FormKategori({
  defaultValue,
  title,
  register,
  errors,
  setValue,
}) {
  const options = [
    { value: "ilufa-168", label: "Ilufa 168" },
    { value: "seri-tahun", label: "Seri Tahun" },
    { value: "triple", label: "Triple" },
    { value: "kuartet", label: "Kuartet" },
    { value: "panca", label: "Panca" },
    { value: "hexa", label: "Hexa" },
    { value: "sapta", label: "Sapta" },
    { value: "okta", label: "Okta" },
    { value: "nona", label: "Nona" },
    { value: "urut-4", label: "Urut 4" },
    { value: "urut-5", label: "Urut 5" },
    { value: "urut-6", label: "Urut 6" },
    { value: "urut-7", label: "Urut 7" },
    { value: "urut-8", label: "Urut 8" },
    { value: "urut-9", label: "Urut 9" },
    { value: "double-AA", label: "Double AA" },
    { value: "double-AAA", label: "Double AAA" },
    { value: "double-AAAA", label: "Double AAAA" },
    { value: "double-AAAAA", label: "Double AAAAA" },
    { value: "double-ab", label: "Double AB" },
    { value: "double-abc", label: "Double ABC" },
    { value: "double-abcd", label: "Double ABCD" },
    { value: "double-abcde", label: " Double ABCDE" },
    { value: "double-abcdef", label: "Double ABCDEF" },
    { value: "triple-aa", label: "Triple AA" },
    { value: "triple-aaa", label: "Triple AAA" },
    { value: "triple-ab", label: "Triple AB" },
    { value: "triple-abc", label: "Triple ABC" },
    { value: "kuartet-aa", label: "Kuartet AA" },
    { value: "kuartet-ab", label: "Kuartet AB" },
    { value: "panca-ab", label: " Panca AB" },
    { value: "eskalator", label: "Eskalator" },
    { value: "tangga", label: "Tangga" },
    { value: "maju-mapan", label: "Maju Mapan" },
  ];

  if (title === "filter") {
    options.unshift({ value: "all", label: "All" });
  }
  const index = options.findIndex((option) => option.value === defaultValue);
  const error = errors?.kategori || null;

  return (
    <>
      <label className="label-form">Katergori</label>
      <Select
        options={options}
        onChange={(event) => {
          register("kategori", { value: event.value });
          setValue("kategori", event.value);
        }}
        defaultValue={options[index]}
        className="input-select"
        placeholder="Pilih Kategori"
      />
      {error && <span>{error.message}</span>}
    </>
  );
}

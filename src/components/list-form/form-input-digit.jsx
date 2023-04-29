import Select from "react-select";

export default function FormDigit({ defaultValue, register, setValue }) {
  const options = [
    { value: "all", label: "All" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
  ];

  const index = options.findIndex((option) => option.value === defaultValue);
  return (
    <>
      <label className="label-form">Digit</label>
      <Select
        options={options}
        onChange={(event) => {
          register("digit", { value: event.value });
          setValue("digit", event.value);
        }}
        defaultValue={options[index]}
        className="input-select"
        placeholder="Pilih Digit"
      />
    </>
  );
}

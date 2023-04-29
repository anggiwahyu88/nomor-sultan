export default function FormAsMaduraTarifLama({
  defaultValue,
  register,
  errors,
}) {
  return (
    <>
      <label className="label-form">as madura tarif lama</label>
      <div className="wrapper-radio">
        <input
          {...register("asMaduraTarifLama")}
          type="radio"
          className="input-radio"
          value="true"
        />
        <p className="text-[1.6vmax] mr-[2vmax]">Ya</p>
        <input
          {...register("asMaduraTarifLama")}
          type="radio"
          className="input-radio"
          value="false"
        />
        <p className="text-[1.6vmax] ">Tidak</p>
      </div>
      {errors.asMaduraTarifLama && (
        <span>{errors.asMaduraTarifLama.message}</span>
      )}
    </>
  );
}

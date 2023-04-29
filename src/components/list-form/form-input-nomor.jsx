export default function FormNomor({ defaultValue,register, errors }) {

  return (
    <>
      <label className="label-form">Nomor</label>
      <input
        {...register("nomor")}
        type="number"
        className="input-text"
        placeholder="08xxxxxxxxxx"
        defaultValue={defaultValue}
      />
      {errors.nomor && <span>{errors.nomor.message}</span>}
    </>
  );
}

export default function FormAsPlayMania({ defaultValue, register, errors }) {
  return (
    <>
      <label className="label-form">as play mania</label>
      <div className="wrapper-radio">
        <input
          {...register("asPlayMania")}
          type="radio"
          className="input-radio"
          value="true"
        />
        <p className="text-[1.6vmax] mr-[2vmax]">Ya</p>
        <input
          {...register("asPlayMania")}
          type="radio"
          className="input-radio"
          value="false"
        />
        <p className="text-[1.6vmax] ">Tidak</p>
      </div>
      {errors.asPlayMania && <span>{errors.asPlayMania.message}</span>}
    </>
  );
}

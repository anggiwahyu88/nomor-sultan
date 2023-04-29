import { useEffect, useState } from "react";
import { rupiahConvert } from "../../../src/utils/rupiahConvert";

export default function FormHarga({ defaultValue, register, errors }) {
  const [price, setPrice] = useState("");

  const handleChange = (harga) => {
    const priceConvert = rupiahConvert(harga);
    setPrice(priceConvert);
  };

  useEffect(() => {
    if (defaultValue) {
      handleChange(defaultValue);
    }
  }, []);

  return (
    <>
      <label className="label-form">Harga</label>
      <input
        {...register("harga")}
        type="text"
        value={price}
        onChange={(event) => handleChange(event.target.value)}
        className="input-text"
        placeholder="Rp. "
      />
      {errors.harga && <span>{errors.harga.message}</span>}
    </>
  );
}

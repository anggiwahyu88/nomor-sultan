import { useState, useContext } from "react";
import { ItemContext } from "../../utils/provider";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Login({useQueryClient}) {
  const [errMessage, setErrMessage] = useState("");
  const { setLoading } = useContext(ItemContext);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userLogin = async (data) => {
    setLoading(true);
    try {
      await axios.post("/api/login", {
        username: data.username,
        password: data.password,
      });
      await queryClient.invalidateQueries("validate-user");
      window.location.replace("/app");
    } catch {
      setErrMessage("user tidak ditemukan");
      setLoading(false);
    }
  };

  return (
    <div className="container-form">
      <form className="card-form" onSubmit={handleSubmit(userLogin)}>
        <div className="flex w-full mt-[.6vmax]">
          <h1 className="font-bold mx-auto text-[2.7vmax]">LOGIN PAGE</h1>
        </div>
        <label className="label-form">USERNAME</label>
        <input
          {...register("username", { required: "form tidak boleh kosong" })}
          className="input-text"
          type="text"
          placeholder="masukan username"
        />

        {errors.username && <span>{errors.username.message}</span>}
        <label className="label-form">PASSWORD</label>
        <input
          {...register("password", { required: "form tidak boleh kosong " })}
          className="input-text"
          type="password"
          placeholder="masukan password"
        />
        {errors.password && <span>{errors.password.message}</span>}
        {errMessage && (
          <div className="w-full flex mt-[.7vmax]">
            <p className="mx-auto text-red-600 text-[1.4vmax]">
              User Tidak Ditemukan
            </p>
          </div>
        )}

        <button
          className={`btn-login ${errMessage ? "mt-[1vmax]" : "mt-[2vmax]"}`}
          type="submit"
        >
          Login
        </button>
        <div className="flex w-full mt-[1vmax] mb-[.8vmax]">
          <Link href="/" className="mx-auto text-[1.7vmax]">
            home
          </Link>
        </div>
      </form>
    </div>
  );
}

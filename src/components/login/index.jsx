import { useState, useContext, useEffect } from "react";
import { ItemContext } from "../../utils/provider";
import axios from "axios";
import Link from "next/link";
import io from "socket.io-client";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [socket, setSocet] = useState()
  const { setLoading } = useContext(ItemContext);

  useEffect(() => {
    setSocet(
      io({
        pingInterval: 20000,
        pingTimeout: 10000,
      })
    );
  }, []);

  const userLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/login", {
        username: username,
        password: password,
      });
      socket.emit("user-update", new Date().getTime());
      window.location.replace("/app");
    } catch {
      setErrMessage("user tidak ditemukan");
      setLoading(false);
    }
  };

  return (
    <div className="container-form">
      <form className="card-form">
        <div className="flex w-full mt-[.6vmax]">
          <h1 className="font-bold mx-auto text-[2.7vmax]">LOGIN PAGE</h1>
        </div>
        <label className="label-form">USERNAME</label>
        <input
          className="input-text"
          required
          type="text"
          placeholder="masukan username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <label className="label-form">PASSWORD</label>
        <input
          className="input-text"
          required
          type="password"
          placeholder="masukan password"
          onChange={(event) => setPassword(event.target.value)}
        />
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
          onClick={(event) => userLogin(event)}
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

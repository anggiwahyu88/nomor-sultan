import { useState, useContext, useEffect } from "react";
import { checkRefreshToken } from "../../src/utils/check-refresh-token";
import { checkAccessToken } from "../../src/utils/check-access-token";
import { ToastContainer } from "react-toastify";
import { ItemContext } from "../../src/utils/provider";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import dynamic from "next/dynamic";
import axios from "axios";
import io from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";

const Admin = dynamic(() => import("../../src/components/admin"), {
  ssr: false,
});
const Uplaod = dynamic(() => import("../../src/components/admin/form/upload"), {
  ssr: false,
});
const Update = dynamic(() => import("../../src/components/admin/form/update"), {
  ssr: false,
});
const FindNomor = dynamic(
  () => import("../../src/components/admin/form/findNomor"),
  {
    ssr: false,
  }
);
const Login = dynamic(() => import("../../src/components/login"), {
  ssr: false,
});

export default function Home({ form, decoded, refreshToken, accessToken }) {
  const [onFormUpdate, SetOnFormUpdate] = useState(false);
  const [onFormUpload, SetOnFormUpload] = useState(false);
  const [nomorValidate, setNomorValidate] = useState(false);
  const [onFindNomor, setOnFindNomor] = useState(false);
  const [nomor, setNomor] = useState("");
  const [datas, setDatas] = useState("");
  const [onAccessToken, setOnAccessToken] = useState(accessToken);
  const { setLoading } = useContext(ItemContext);

  const axiosJWT = axios.create({});

  useEffect(() => {
    // const checkUserValidate = async () => {
    //   try {
    //     await axios.get("/api/users/check-user-validate", {
    //       headers: {
    //         Authorization: `Bearer ${refreshToken}`,
    //       },
    //     });
    //     window.location.reload();
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };
    // checkUserValidate();
    // const socket = io({
    //   pingInterval: 20000,
    //   pingTimeout: 10000,
    // });
    // socket.on("user-update", async (data) => {
    //   try {
    //     await axios.get("/api/users/check-user-validate", {
    //       headers: { Authorization: `Bearer ${refreshToken}` },
    //     });
    //     window.location.reload();
    //   } catch (err) {
    //     console.error(err);
    //   }
    // });
    // const socketInitializer = async () => {
    //   await fetch("/api/socket");
    // };
    // socketInitializer();
  }, []);

  axiosJWT.interceptors.request.use(
    async (config) => {
      setLoading(true);
      const currentDate = new Date();
      if (decoded.exp * 1000 <= currentDate.getTime()) {
        const response = await axios.get("/api/users/get-token", {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        setOnAccessToken(response.data.token);
        config.headers.Authorization = `Bearer ${response.data.token}`;
      }
      setLoading(false);
      return config;
    },
    (err) => {
      setLoading(false);
      return Promise.reject(err);
    }
  );
  const handleFormUpdate = () => {
    SetOnFormUpdate(false);
    setNomorValidate(false);
  };
  const handleFormUpload = () => {
    SetOnFormUpload(!onFormUpload);
  };

  const findNomor = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const product = await axios.get(`/api/product/nomor/${nomor}`);
      setNomorValidate(true);
      setOnFindNomor(false);
      SetOnFormUpdate(true);
      setDatas(product.data.product);
    } catch (err) {
      toast.error("nomor tidak ditemukan");
    } finally {
      setLoading(false);
    }
  };

  if (form === "login") {
    return (
      <div className="h-screen bg-gray-100">
        <Login />
      </div>
    );
  }

  return (
    <ItemContext.Provider
      value={{
        handleFormUpdate,
        handleFormUpload,
        findNomor,
        setOnFindNomor,
        setNomor,
        axiosJWT,
        setLoading,
      }}
    >
      <ToastContainer />
      {onFormUpload && <Uplaod token={onAccessToken} />}
      {!nomorValidate && onFindNomor ? <FindNomor /> : ""}
      {onFormUpdate && nomorValidate ? (
        <Update data={datas} token={onAccessToken} />
      ) : (
        ""
      )}
      <Admin token={onAccessToken} username={decoded.username} />
    </ItemContext.Provider>
  );
}

export async function getServerSideProps(contex) {
  const form = contex?.query?.form || null;
  const accessToken =
    contex?.req?.headers?.cookie?.replace(
      /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    ) || null;
  const refreshToken =
    contex?.req?.headers?.cookie?.replace(
      /(?:(?:^|.*;\s*)refresh_token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    ) || null;

  if ((!accessToken || !refreshToken) && form !== "login") {
    return {
      notFound: true,
    };
  }

  const validateRefreshToken = await checkRefreshToken(refreshToken);
  const validateAccessToken = await checkAccessToken(accessToken);

  let decoded = validateAccessToken;

  if ((!validateRefreshToken || !validateAccessToken) && form === "login") {
    return {
      props: { form },
    };
  }

  if (validateRefreshToken && !validateAccessToken) {
    const token = await axios.get("http://localhost:3000/api/users/get-token", {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    contex.res.setHeader(
      "Set-Cookie",
      `access_token=${token.data.token}; Path=/app; HttpOnly`
    );
    decoded = jwt_decode(token.data.token);
    return {
      props: { decoded, refreshToken, accessToken },
    };
  }
  return {
    props: { decoded, refreshToken, accessToken },
  };
}

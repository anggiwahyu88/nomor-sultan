import { ItemContext } from "../../utils/provider";
import { useContext } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Admin({ username, token }) {
  const { setOnFindNomor } = useContext(ItemContext);
  const { handleFormUpload } = useContext(ItemContext);
  const { axiosJWT } = useContext(ItemContext);
  const router = useRouter();

  const logout = async () => {
    try {
      await axiosJWT.post(
        `/api/users/logout/${username}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/");
    } catch {
      toast.error("logout gagal");
    }
  };

  return (
    <div className="">
      <div>
        <div>
          <button onClick={() => handleFormUpload()}>upload</button>
        </div>
        <p>upload nomor</p>
      </div>
      <div>
        <div>
          <button onClick={() => setOnFindNomor(true)}>update</button>
        </div>
        <p>update nomor</p>
      </div>
      <div>
        <div>
          <button onClick={() => setOnFindNomor(true)}>tambah promo</button>
        </div>
        <p>tambah promo</p>
      </div>
      <div>
        <div>
          <button onClick={() => setOnFindNomor(true)}>update promo</button>
        </div>
        <p>update promo</p>
      </div>
      <div>
        <div>
          <button onClick={() => logout()}>logout</button>
        </div>
        <p>logout</p>
      </div>
    </div>
  );
}

import { ItemContext } from "../../utils/provider";
import { useContext } from "react";

export default function Admin({ logout }) {
  const { setOnFindNomor } = useContext(ItemContext);
  const { handleFormUpload } = useContext(ItemContext);

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

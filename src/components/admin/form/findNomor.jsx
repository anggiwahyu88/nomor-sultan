import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react";
import { ItemContext } from "../../../utils/provider";

export default function FindNomor() {
  const { findNomor, setOnFindNomor, setNomor } = useContext(ItemContext);

  return (
    <div className="container-form">
      <form className="m-auto bg-[white] h-[15vmax] w-[30vmax] rounded-[1.3vmax] pl-[1.2vmax]">
        <label className="text-[2.7vmax] text-center font-medium capitalize ">
          masukan nomor
        </label>
        <div className="flex mt-[2vmax]">
          <div className="m-auto h-[6vmax] w-[80%] relative rounded-[1.3vmax] solid">
            <input
              type="number"
              onChange={(event) => setNomor(event.target.value)}
              className="h-full w-[82%] absolute left-0 rounded-l-[1.3vmax] text-[1.9vmax] pl-[.4vmax] focus:outline-0"
              placeholder="08xxxxxxxxxx"
              required
            />
            <button
              onClick={(event) => findNomor(event)}
              type="submit"
              className="absolute right-0 h-full w-[18%] rounded-r-[1.3vmax] flex text-[2.2vmax] text-primary"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="m-auto" />
            </button>
          </div>
          <div className=" my-auto h-[6vmax] flex w-[20%]">
            <button
              onClick={() => setOnFindNomor(false)}
              className=" h-[min-content] m-auto text-[2vmax] font-semibold"
            >
              batal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

import { ItemContext } from "../../utils/provider";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons"

export default function Filter({ data }) {
  const { setOnForm } = useContext(ItemContext);

  return (
    <div className=" w-[45vmax] flex pt-[11vmax]">
      <div className="h-[12%] text-center w-[30.25%] ">
        <p className="title-filter">Oprator</p>
        <p className="content-filter">{data.oprator}</p>
      </div>
      <div className="h-[12%] text-center w-[35%] solid-x">
        <p className="title-filter">Kategori</p>
        <p className="content-filter">{data.kategori}</p>
      </div>
      <div className="h-[12%] text-center w-[20%]">
        <p className="title-filter">Digit</p>
        <p className="content-filter">{data.digit}</p>
      </div>
      <button
        className="flex w-[14.75%] text-[3vmax] bg-white hover:bg-[#fafafafa]"
        onClick={() => setOnForm(true)}
      >
        <FontAwesomeIcon icon={faFilter}  className="m-auto"/>
      </button>
    </div>
  );
}

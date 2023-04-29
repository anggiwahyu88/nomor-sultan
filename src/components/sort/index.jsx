import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Sort({ title, setTypeSort, data }) {
  const router = useRouter();
  const [onSort, setOnSort] = useState(false);

  const handleSort = (title, type) => {
    setTypeSort(title);
    setOnSort(!onSort);
    router.push(
      `search?nomor=${data.nomor}&oprator=${data.oprator}&kategori=${data.kategori}&digit=${data.digit}&sort=${type}`
    );
  };
  return (
    <>
      <div className="relative h-[5vmax]  mb-[1.4vmax]">
        <p className="absolute right-[14.7vmax] bottom-[1.1vmax] text-[1.14vmax] font-semibold">
          Urutkan:
        </p>
        <button
          onClick={() => setOnSort(!onSort)}
          className={`absolute right-[1vmax] bottom-0 h-[4vmax] w-[13vmax] flex rounded-[1vmax] ${
            onSort ? "solid-primary" : "solid"
          }`}
        >
          <div className="w-[70%] my-auto capitalize">
            <p className="text-[1.2vmax]">{title}</p>
          </div>
          <div className="w-[30%] my-auto flex justify-center items-center text-[1.8vmax]">
            {onSort ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </div>
        </button>
      </div>
      {onSort && (
        <ul className="absolute right-[1vmax] top-[28.5vmax] z-[2] bg-white solid mt-[.6vmax] w-[13vmax] rounded-[1vmax]">
          <li
            className={`list-sort ${
              title === "paling sesuai" && "solid-l-sort"
            }`}
          >
            <button
              onClick={() => handleSort("paling sesuai", "none")}
              className="btn-sort"
            >
              Paling Sesuai
            </button>
          </li>
          <li
            className={`list-sort ${
              title === "harga tertinggi" && "solid-l-sort"
            }`}
          >
            <button
              onClick={() => handleSort("harga tertinggi", "DCS")}
              className="btn-sort"
            >
              Harga Tertinggi
            </button>
          </li>
          <li
            className={`list-sort ${
              title === "harga terendah" && "solid-l-sort"
            }`}
          >
            <button
              onClick={() => handleSort("harga terendah", "ASC")}
              className="btn-sort"
            >
              Harga Terendah
            </button>
          </li>
        </ul>
      )}
    </>
  );
}

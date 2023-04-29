import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const ListNavbar = dynamic(() => import("./list-navbar"), {
  ssr: false,
});

export default function Navbar({ data, params }) {
  const [onSearch, setOnSearch] = useState("");
  const [onMenu, setOnMenu] = useState(false);
  const [onRender, setOnRender] = useState(false);
  const router = useRouter();

  const datas = data || {
    oprator: "all",
    kategori: "all",
    digit: "all",
    sort: "none",
  };

  useEffect(() => {
    if (data) {
      setOnSearch(data.nomor);
    }
  }, [data]);

  const search = (event) => {
    if ((event.key === "Enter" && onSearch) || event.type === "click") {
      event.preventDefault();
      router.push(
        `/search?nomor=${onSearch}&oprator=${datas.oprator}&kategori=${datas.kategori}&digit=${datas.digit}&sort=${datas.sort}`
      );
    }
  };

  return (
    <nav className="fixed z-10 w-full h-[9vmax] bg-white">
      <div className="relative w-full h-full shadow-nav bg-white flex">
        {/* <Link href="/" className="absolute top-0 left-0 h-full w-[11vmax] solid rounded-full flex text-primary ml-2">
                    <p className="m-auto text-[7vmax]">NS</p>
                </Link> */}
        <form className="flex items-center h-full w-[40%] m-auto">
          <div className="relative text-secondary solid rounded-[.8vmax] h-[40%] w-full flex">
            <input
              placeholder="Search"
              required
              type="number"
              className=" pl-[.7vmax] w-[85%] h-full rounded-l-[.8vmax] focus:outline-0 text-black text-[1.5vmax]"
              onChange={(event) => setOnSearch(event.target.value)}
              onKeyDown={search}
              value={onSearch}
            />
            <button
              onClick={(event) => search(event)}
              className="absolute right-0 bottom-0 h-full w-[11%] flex text-[1.8vmax] solid-l-navbar"
              type="submit"
              title="Cari"
              name="search"
              disabled={!onSearch}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="m-auto" />
            </button>
          </div>
        </form>
        <div
          className={`flex absolute right-[1.6vmax] h-full w-[6vmax] text-[4vmax]`}
        >
          <div className="btn-dropdown w-full h-[40%] m-auto flex justify-center rounded-[.8vmax] text-[2.3vmax]">
            <button
              onClick={() => {setOnMenu(!onMenu), setOnRender(true)}}
              className="h-full w-full flex"
            >
              {onMenu ? (
                <FontAwesomeIcon icon={faXmark} className="m-auto" />
              ) : (
                <FontAwesomeIcon icon={faBars} className="m-auto" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`h-[19vmax] w-full absolute ${
          onMenu ? "translate-y-0" : "translate-y-[-100%]"
        } drop-down z-[-1]`}
      >
        {onRender && (
          <>
            <ListNavbar params={params} title={"beli 2 dapat 3"} />
            <ListNavbar params={params} title={"couple"} />
            <ListNavbar params={params} title={"as madura tarif lama"} />
            <ListNavbar params={params} title={"as play mania"} />
            <ListNavbar params={params} title={"kontak"} />
          </>
        )}
      </div>
    </nav>
  );
}

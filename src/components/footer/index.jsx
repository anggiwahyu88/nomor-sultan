import {
  faWhatsappSquare,
  faInstagramSquare,
  faFacebookSquare,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListContact from "./list-contact"
import Link from "next/link";

export default function Footer() {
  const instragam = () => {
    open("https://www.instagram.com/nomorsultan_com/", "_blank");
  };
  const facebook = () => {
    open("https://www.facebook.com/trim.nocann", "_blank");
  };

  const maps = () => {
    open("https://goo.gl/maps/UHosNFAFmEhaUgZF7", "_blank");
  };

  return (
    <footer className="mt-auto w-full flex-1">
      <div className="h-[12.48vmax] flex bg-gray-300 py-[2vw]">
        <div className="m-auto h-full w-[60vmax] flex gap-[5%]">
          <div className="m-auto w-[27%] h-full">
            <h1 className="text-[1.8vmax]">Alamat</h1>
            <p className="text-[1.1vmax]">
              Desa Pucung Kidul, Boyolangu, Tulungagung, Jawa Timur, Indonesia
            </p>
            <button
              className="text-[blue] mt-[.2vw] text-[1.2vmax]"
              onClick={() => maps()}
            >
              Lihat Peta
            </button>
          </div>
          <div className="m-auto w-[min-content] h-full">
            <h1 className="text-[1.8vmax]">Hubungi Kami</h1>
            <ListContact title={"081222222224"} icon={faWhatsappSquare} FontAwesomeIcon={FontAwesomeIcon}/>
            <ListContact title={"081222222224"} icon={faPhone} FontAwesomeIcon={FontAwesomeIcon}/>
            <ListContact title={"nomorsultan@gmail.com"} icon={faEnvelope} FontAwesomeIcon={FontAwesomeIcon}/>
          </div>
          <div className="m-auto w-[max-content] h-full">
            <h1 className="text-[1.8vmax]">Social Media</h1>
            <div className="text-[2.1vmax] flex gap-[1vmax]">
              <button onClick={() => facebook()}>
                <FontAwesomeIcon icon={faFacebookSquare} />
              </button>
              <button onClick={() => instragam()}>
                <FontAwesomeIcon icon={faInstagramSquare} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[3.52vmax] bg-white flex">
        <p className="m-auto text-[1.2vmax] font-semibold">
          Copyright &copy;{new Date().getFullYear()}
          <Link href="/" className="text-primary">
            Nomorsultan
          </Link>
        </p>
      </div>
    </footer>
  );
}

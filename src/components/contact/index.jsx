import {
  faLocationDot,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsappSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Contact() {
  return (
    <main className="flex w-full h-screen mt-[11vmax] mb-[2vmax]">
      <div className="w-[30vmax] h-[30vmax] m-auto flex solid bg-white">
        <div className="w-[87%] h-[90%] m-auto">
          <div className="h-[32%] text-center">
            <h1 className="uppercase text-[4vmax] font-semibold text-primary">
              kontak
            </h1>
          </div>
          <div className="h-[17%] flex">
            <div className="h-full w-[20%] flex">
              <p className="m-auto text-[2.3vmax]">
                <FontAwesomeIcon icon={faLocationDot} />
              </p>
            </div>
            <div className="w-[80%] flex">
              <p className="m-auto  text-[1.4vmax] font-medium">
                Desa Pucung Kidul, Boyolangu, Tulungagung
              </p>
            </div>
          </div>
          <div className="h-[17%] flex">
            <div className="h-full w-[20%] flex">
              <p className="m-auto text-[2.3vmax]">
                <FontAwesomeIcon icon={faEnvelope} />
              </p>
            </div>
            <div className="w-[80%] flex">
              <p className="m-auto  text-[1.4vmax] font-medium">
                nomorsultan@gmail.com
              </p>
            </div>
          </div>
          <div className="h-[17%] flex">
            <div className="h-full w-[20%] flex">
              <p className="m-auto text-[2.3vmax]">
                <FontAwesomeIcon icon={faPhone} />
              </p>
            </div>
            <div className="w-[80%] flex">
              <p className="m-auto  text-[1.4vmax] font-medium">081222222224</p>
            </div>
          </div>
          <div className="h-[17%] flex">
            <div className="h-full w-[20%] flex">
              <p className="m-auto text-[2.3vmax]">
                <FontAwesomeIcon icon={faWhatsappSquare} />
              </p>
            </div>
            <div className="w-[80%] flex">
              <p className="m-auto  text-[1.4vmax] font-medium">081222222224</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

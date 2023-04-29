import dynamic from "next/dynamic";
const Contact = dynamic(() => import("../../src/components/contact"), {
  ssr: false,
});
const Navbar = dynamic(() => import("../../src/components/navbar"), {
  ssr: false,
});
const Footer = dynamic(() => import("../../src/components/footer"), {
  ssr: false,
});

export default function kontak() {
  return (
    <>
      <Navbar params={"kontak"}/>
      <Contact />
      <Footer />
    </>
  );
}

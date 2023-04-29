import Link from "next/link";

export default function ListOprator({ title, isDesktop }) {
  return (
    <div className={`${isDesktop && "card-op"} ${isDesktop === false&& "card-op-mobile"}`}>
      <Link href={`/oprator/${title}`} className="link-op">
        <div className="solid h-[4.5vmax] w-[4.5vmax] m-auto rounded-[1.2vmax]"></div>
        <div className="text-[1.6vmax] font-medium w-full text-center flex justify-center items-end">
          <p>{title}</p>
        </div>
      </Link>
    </div>
  );
}

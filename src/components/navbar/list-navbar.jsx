import { useEffect, useState } from "react";
import Link from "next/link";

export default function ListNavbar({ params, title }) {
  const [newTitle, setNewTitle] = useState("");
  useEffect(() => {
    setNewTitle(title.replace(/\s+/g, "-"));
  }, [title]);
  return (
    <div className={`${params === title && "text-primary disable"} div-mobile`}>
      <Link href={`/${newTitle}`} className="link-mobile">
        {title}
      </Link>
    </div>
  );
}

import CardSkeleton from "../product/skeleton/card-skeleton";
import Skeleton from "react-loading-skeleton";

export default function SkeletonKoleksi() {
  return (
    <>
      <div className="h-[30vmax] mt-4 bg-white">
        <div className="h-[20%] border-b capitalize text-[2vmax] flex items-center justify-between">
          <Skeleton
            height={"100%"}
            containerClassName={"h-[2.7vmax] w-[15vmax] my-auto flex ml-[2vmax]"}
          />
          <Skeleton
            height={"100%"}
            containerClassName={"h-[2.7vmax] w-[15vmax] my-auto flex mr-[2vmax]"}
          />
        </div>

        <div className="flex relative w-full h-[80%] items-center pl-[1vw]">
          <CardSkeleton />
        </div>
      </div>
    </>
  );
}

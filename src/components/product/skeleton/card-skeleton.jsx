import Skeleton from "react-loading-skeleton";

export default function CaradSkeleton() {
  return (
    <div className="solid w-[16vmax] h-[20vmax] rounded-[1.5vmax] flex-wrap p-[1vmax]">
      <div className="h-full w-full rounded-[1.5vmax] relative">
        <div className="absolute top-[6%]">
          <Skeleton circle containerClassName={"h-[5vmax] w-[5vmax] flex"} />
        </div>
        <div className="h-[30%] absolute top-[42%] flex border-bottom">
          <Skeleton
            height={"100%"}
            containerClassName={"h-[50%] w-[13vmax] m-auto flex"}
            className="m-auto"
          />
        </div>
        <div className="absolute bottom-[2%] h-[27%] flex">
          <Skeleton
            height={"100%"}
            containerClassName={"h-[50%] w-[12vmax] m-auto flex"}
            className="m-auto"
          />
        </div>
      </div>
    </div>
  );
}

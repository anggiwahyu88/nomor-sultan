import CaradSkeleton from "./card-skeleton";

export default function ProductSkeleton() {
  return (
    <div className="flex justify-evenly flex-wrap gap-[1.2vmax]">
      <CaradSkeleton />
      <CaradSkeleton />
      <CaradSkeleton />
      <CaradSkeleton />
      <CaradSkeleton />
    </div>
  );
}

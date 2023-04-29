import LoadingOverlay from "react-loading-overlay";
export default function Loading() {
  return (
    <LoadingOverlay
      active={true}
      spinner={<div class="custom-loader"></div>}
      className="fixed w-full h-full z-[20]"
      styles={{
        wrapper: {},
      }}
      classNamePrefix="css-79elbk"
    ></LoadingOverlay>
  );
}

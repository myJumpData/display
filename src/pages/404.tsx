import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";

export default function Page() {
  const router = useRouter();
  return (
    <div
      className="min-vh-100 position-relative top-0 right-0 bottom-0 vw-100 position-fixed d-flex flex-column justify-content-center align-items-center text-secondary"
      style={{ left: 100, zIndex: 1 }}
    >
      <div className="text-center text-white opacity-75">
        <h1 className="display-1">404</h1>
        Not Found
      </div>
      <div
        className="text-info mt-4 d-flex gap-2 align-items-center justify-content-center"
        style={{ cursor: "pointer" }}
        onClick={() => {
          router.back();
        }}
      >
        <FaArrowLeft className="inline-block" /> Go Back
      </div>
    </div>
  );
}

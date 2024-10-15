import Image from "next/image";
import { Clock } from "./display";

export default function DisplayFooter({
  state,
  heats,
  heat,
}: {
  state: "fetching" | "success" | "error" | undefined;
  heats: number;
  heat: number;
}) {
  return (
    <div
      className="fw-bold align-items-center d-flex position-relative w-100 d-flex align-items-center justify-content-center flex-shrink-0"
      style={{
        height: "10vh",
        marginTop: "2.5vh",
        marginBottom: "2.5vh",
      }}
    >
      <div className="position-absolute top-0 bottom-0 start-0 text-white d-flex align-items-center">
        <span
          style={{
            fontSize: "5vh",
            fontFamily: "monospace",
            lineHeight: "0.75",
            opacity: 0.5,
            marginLeft: "2.5vh",
          }}
        >
          {heats > 0 ? `Heat ${heat}/${heats}` : null}
        </span>
      </div>
      <Image
        className="d-inline-block me-2"
        style={{
          height: "10vh",
          width: "auto",
        }}
        src="/myJumpData-Banner-white.svg"
        alt="myJumpData"
        height="360"
        width="500"
      />
      <div
        className="position-absolute bottom-0 start-0 end-0 text-white d-flex align-items-center w-100"
        style={{
          height: ".25vh",
          backgroundColor:
            state === "fetching"
              ? "#f90"
              : state === "success"
              ? "#0f0"
              : state === "error"
              ? "#f00"
              : "#999",
          transition: "background-color 0.5s",
          marginBottom: "-2.5vh",
          zIndex: 1,
        }}
      />
      <div
        className="position-absolute top-0 bottom-0 end-0 text-white d-flex align-items-center"
        style={{
          fontSize: "5vh",
          marginRight: "2.5vh",
        }}
      >
        <Clock short={true} />
      </div>
    </div>
  );
}

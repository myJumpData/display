import { useParams } from "react-router";
import alphabetNumArray from "../lib/utils/alphabetNumArray";
import alphabetsNumToNum from "../lib/utils/alphabetNumToNum";
import fullname from "../lib/utils/fullname";

export default function Live({ data, d }: any) {
  const params = useParams();

  const rows = Number(data?.liveRows) || Number(params?.rows) || 1;
  const columns = Math.ceil((data?.data?.length || params?.limit || 0) / rows);
  const skip = Number(data?.skip) || Number(params?.skip) || 0;

  const numberFontSize = 100 / (columns * 2);

  return (
    <div
      className="w-100 d-grid h-100 text-white bg-black"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {(
        data?.data ||
        Array.from({
          length: rows * columns,
        }).map((_, i) => ({
          field: alphabetNumArray()?.[i + skip],
        }))
      )?.map((item: any, index: number) => (
        <div
          key={index}
          className="d-flex align-items-center justify-content-center position-relative overflow-hidden border"
          style={{
            opacity: item?.empty ? 0.25 : 1,
          }}
        >
          {item?.clubLogo ? (
            <div className="position-absolute bottom-0 start-0 end-0">
              <img
                src={item?.clubLogo}
                width={100}
                height={100}
                alt=""
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: `${100 / columns}vw`,
                }}
              />
              <div
                className="position-absolute bottom-0 start-0 end-0 top-0"
                style={{
                  background:
                    "linear-gradient(0deg,rgba(0, 0, 0, 0) 0%,rgba(0, 0, 0, .9) 80%,rgba(0, 0, 0, 1) 100%)",
                }}
              />
            </div>
          ) : null}
          <div
            className="fw-bold position-absolute top-0 start-0 ps-2"
            style={{
              lineHeight: 1,
              fontSize: "3rem",
            }}
          >
            {alphabetsNumToNum(item?.field)}
          </div>
          <div
            className="position-absolute bottom-0 text-center pb-2"
            style={{
              lineHeight: 1,
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            {item?.text}
            {item?.athlete
              ? `#${item?.startId} ${fullname(item?.athlete)}`
              : ""}
          </div>
          {!item?.empty ? (
            <div
              className="w-100 fw-bold font-monospace text-center"
              style={{
                lineHeight: 1,
                fontSize: `${numberFontSize}vw`,
                zIndex: 1,
                color: d[item?.field.toLowerCase()]?.final
                  ? "rgba(34,197,94,1)"
                  : undefined,
              }}
            >
              {d[item?.field.toLowerCase()]?.value || "/"}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

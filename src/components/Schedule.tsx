import alphabetsNumToNum from "../lib/utils/alphabetNumToNum";

export default function Schedule({
  data,
}: {
  data: {
    field: string;
    startId: number;
    name: string;
    club: string;
    clubLogo: string;
    names?: string;
  };
}) {
  return (
    <div className="d-flex align-items-center justify-content-center flex-column position-relative overflow-hidden bg-black h-100 w-100">
      <div
        className="fw-bold position-absolute top-0 start-0 ps-2"
        style={{
          lineHeight: 1,
          fontSize: "3rem",
        }}
      >
        {alphabetsNumToNum(data?.field)}
      </div>
      <div className="pe-3 d-flex justify-content-end">
        <span
          className="fw-bold h4 text-body-primary text-center font-monospace"
          style={{
            lineHeight: 1,
            fontSize: "15vw",
          }}
        >
          {"#" + data?.startId || ""}
        </span>
      </div>
      <span
        className="h5 text-body-primary text-center"
        style={{
          lineHeight: 1,
          fontSize: data?.names ? "7.5vw" : "10vw",
        }}
      >
        {data?.name}
      </span>
      <div className="d-flex align-items-center mb-2">
        {data?.clubLogo ? (
          <div className="pe-2">
            <img
              src={data?.clubLogo}
              alt={data?.club || ""}
              width={100}
              height={100}
              style={{
                objectFit: "contain",
                height: data?.names ? "4vw" : "6vw",
                width: data?.names ? "4vw" : "6vw",
              }}
            />
          </div>
        ) : null}
        <span
          className="h5 text-body-secondary m-0 text-center"
          style={{
            lineHeight: 1,
            fontSize: data?.names ? "4vw" : "6vw",
          }}
        >
          {data?.names || data?.club}
        </span>
      </div>
    </div>
  );
}

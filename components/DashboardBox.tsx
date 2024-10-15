import classNames from "classnames";
import Image from "next/image";
import { ReactNode } from "react";

export default function DashboardBox({
  name,
  children,
  image,
  overlay,
  imageAuthor,
}: {
  name: string;
  children?: ReactNode;
  image?: string | null;
  overlay?: ReactNode;
  imageAuthor?: string;
}) {
  return (
    <div className="col-12 col-md-6 col-xl-4 col-xxl-3 py-3">
      <div className="card overflow-hidden" style={{ minHeight: "100%" }}>
        <div className="card-header d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <span className="d-inline-block">{name}</span>
          </div>
        </div>
        <div className="row g-0 flex-grow-1">
          {image !== undefined ? (
            <div
              className="col-4 position-relative"
              style={{
                minHeight: "1rem",
              }}
            >
              {image ? (
                <Image
                  src={image}
                  alt={name}
                  fill={true}
                  className="opacity-50 object-fit-cover"
                  sizes="100%"
                />
              ) : null}
              {imageAuthor ? (
                <p
                  style={{
                    fontSize: ".3rem",
                    lineHeight: 1,
                  }}
                  className="m-0 p-2 bottom-0 position-absolute w-100 text-white opacity-50"
                >
                  &copy;{` ${imageAuthor}`}
                </p>
              ) : null}
              <div
                className="h-100 position-absolute top-0 left-0 w-100 overflow-x-hidden bg-dark bg-opacity-50 bg-gradient"
                style={{
                  zIndex: 1,
                }}
              >
                {overlay}
              </div>
            </div>
          ) : null}
          <div
            className={classNames({
              "col-8": image !== undefined,
              "col-12": image === undefined,
            })}
          >
            <div
              className="card-body flex-grow-1 d-flex h-100"
              style={{ maxHeight: 200 }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

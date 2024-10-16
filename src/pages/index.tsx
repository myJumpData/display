import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaCloud, FaEnvelope, FaPhone, FaServer } from "react-icons/fa";
import { TbPlugConnected, TbPlugConnectedX } from "react-icons/tb";
import DashboardBox from "../../components/DashboardBox";
import { API } from "../../lib/api";

export default function Page() {
  const { data }: any = API.useGetSystemDataQuery(undefined, {
    pollingInterval: 2000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  return (
    <>
      <div className="row mb-4">
        <DashboardBox name="Network">
          <div>
            {data?.system?.network?.length > 0 ? (
              data?.system?.network?.map((item: any, index: number) => (
                <div key={index} className="my-2">
                  <div>
                    <strong>{item.interface}</strong>
                  </div>
                  <div className="font-monospace">{item.address}</div>
                </div>
              ))
            ) : (
              <ul>
                <li>Check network cables</li>
                <li>Check wifi connectivity</li>
                <li>Reboot the router</li>
                <li>Check router configuration</li>
              </ul>
            )}
          </div>
        </DashboardBox>
        <DashboardBox name="Cloud">
          <div className="d-flex align-items-center flex-grow-1">
            <div
              className="d-flex flex-column align-items-center justify-content-center"
              style={{
                paddingRight: "1rem",
              }}
            >
              <FaServer style={{ fontSize: "2rem" }} />
              Local
            </div>
            <div className="flex-grow-1">
              <div
                className={classNames("w-100", {
                  "border-success": data?.cloud?.status,
                  "border-danger": !data?.cloud?.status,
                })}
                style={{
                  width: "100%",
                  height: 0,
                  borderBottomWidth: "0.25rem",
                  borderBottomStyle: "dashed",
                  borderBottomColor: "currentColor",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "2rem",
                lineHeight: 1,
                paddingLeft: "1rem",
                paddingRight: "1rem",
              }}
            >
              {data?.cloud?.status ? (
                <div className="text-success">
                  <TbPlugConnected />
                </div>
              ) : (
                <div className="text-danger">
                  <TbPlugConnectedX />
                </div>
              )}
            </div>
            <div className="flex-grow-1">
              <div
                className={classNames("w-100", {
                  "border-success": data?.cloud?.status,
                  "border-danger": !data?.cloud?.status,
                })}
                style={{
                  width: "100%",
                  height: 0,
                  borderBottomWidth: "0.25rem",
                  borderBottomStyle: "dashed",
                  borderBottomColor: "currentColor",
                }}
              />
            </div>
            <div
              className="d-flex flex-column align-items-center justify-content-center"
              style={{
                paddingLeft: "1rem",
              }}
            >
              <FaCloud style={{ fontSize: "2rem" }} />
              <span>Cloud</span>
            </div>
          </div>
        </DashboardBox>
        <DashboardBox
          name="Version"
          overlay={
            <div className="d-flex flex-column justify-content-evenly align-items-center h-100">
              <div
                className={classNames("rounded-circle", {
                  "bg-success": data?.version?.local === data?.version?.github,
                  "bg-danger": data?.version?.local !== data?.version?.github,
                })}
                style={{
                  height: "5rem",
                  width: "5rem",
                }}
              />
            </div>
          }
          image={null}
        >
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Local</td>
                <td>{data?.version?.local}</td>
              </tr>
              <tr>
                <td>GitHub</td>
                <td>{data?.version?.github}</td>
              </tr>
            </tbody>
          </table>
        </DashboardBox>
        <DashboardBox
          name="System Information"
          overlay={
            <div className="d-flex flex-column justify-content-evenly align-items-center h-100">
              <span className="fw-bold text-white">myJumpData</span>
              <Image
                src="/Logo.svg"
                alt="myJumpData"
                width={50}
                height={50}
                style={{
                  height: "5rem",
                  width: "5rem",
                }}
              />
            </div>
          }
          image={null}
        >
          <div
            className="d-flex flex-column justify-content-evenly overflow-y-auto"
            style={{
              margin: "-1rem",
              padding: "0 0.5rem",
            }}
          >
            {data?.system?.info?.map(({ key, value }: any, index: number) => (
              <span key={index} className="lh-1 py-1">
                <strong className="me-2">{key}:</strong>
                <small>{value}</small>
              </span>
            ))}
          </div>
        </DashboardBox>
        <DashboardBox name="myJumpData Help">
          <div>
            <p>
              <FaEnvelope className="me-2" />
              <span>
                <Link href="mailto:myjumpdata@gmail.com" className="text-main">
                  myJumpData@gmail.com
                </Link>
              </span>
            </p>
            <p>
              <FaPhone className="me-2" />
              <span>
                <Link href="tel:+4917682763899" className="text-main me-2">
                  +46 176 8276 3899
                </Link>
                (Call, SMS, WhatsApp)
              </span>
            </p>
            <p>
              <FaBars className="me-2" />
              <span>
                <Link
                  href="https://myjumpdata.de/docs/category/myjumpdata--competition"
                  className="text-main me-2"
                >
                  Online Documentation
                </Link>
              </span>
            </p>
            <small className="small text-secondary">
              &copy; myJumpData {new Date().getFullYear()}
            </small>
          </div>
        </DashboardBox>
      </div>
    </>
  );
}

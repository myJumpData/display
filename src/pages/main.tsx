import classNames from "classnames";
import { FaBars, FaCloud, FaEnvelope, FaPhone, FaServer } from "react-icons/fa";
import { TbPlugConnected, TbPlugConnectedX } from "react-icons/tb";
import { Link } from "react-router";
import DashboardBox from "../components/DashboardBox";
import { API } from "../lib/api";

export default function Main() {
  const { data }: any = API.useGetSystemDataQuery(undefined, {
    pollingInterval: 2000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  return (
    <div>
      <nav
        className="navbar navbar-expand bg-body-tertiary shadow-sm"
        style={{
          height: 56,
          zIndex: 200,
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              className="d-inline-block me-2"
              src="static://assets/myJumpData-Banner-white.svg"
              alt="myJumpData"
              height="40"
              width="30"
              style={{
                width: "auto",
                height: "2.5rem",
              }}
            />
          </Link>
          <div>
            <ul className="navbar-nav w-100">
              <li className="nav-item ms-auto me-auto">
                <Link to="/display/1" className="nav-link" target="_blank">
                  Display 1
                </Link>
              </li>
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle text-info"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Offline Display Templates
                </span>
                <ul className="dropdown-menu">
                  {[
                    [1, 1],
                    [2, 1],
                    [3, 2],
                    [4, 2],
                    [5, 2],
                    [6, 2],
                    [7, 2],
                    [7, 3],
                    [8, 2],
                    [8, 3],
                    [9, 3],
                  ].map(
                    ([items, rows]: number[], index: number, a: number[][]) => {
                      const cols = Math.ceil((items || 0) / rows);
                      const height = 3;
                      return (
                        <li
                          key={index}
                          className={classNames("dropdown-item", {
                            "border-bottom": a.length - 1 !== index,
                          })}
                        >
                          <Link
                            to={`/display/0/${items}/${rows}`}
                            className="nav-link p-0 d-flex flex-row justify-content-between align-items-center"
                            target="_blank"
                          >
                            <strong>{items}</strong>
                            <div
                              className="d-grid text-white bg-black border border-info"
                              style={{
                                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                                gridTemplateRows: `repeat(${rows}, 1fr)`,
                                height: `${height}rem`,
                                width: `${height * (16 / 9)}rem`,
                              }}
                            >
                              {Array.from({
                                length: items,
                              }).map((item: any, index: number) => (
                                <div
                                  className="border font-monospace text-center d-flex align-items-center justify-content-center"
                                  key={index}
                                  style={{
                                    fontSize: `${height / 10}rem`,
                                  }}
                                >
                                  {index + 1}
                                </div>
                              ))}
                            </div>
                          </Link>
                        </li>
                      );
                    }
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        className="d-flex position-absolute left-0 right-0 bottom-0 bg-body text-body w-100"
        style={{
          top: 56,
          zIndex: 100,
        }}
      >
        <main
          className={classNames(
            "p-3 overflow-y-auto w-100 bg-body bg-gradient"
          )}
        >
          <div style={{ minHeight: "fit-content" }}>
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
                        "bg-success":
                          data?.version?.local === data?.version?.github,
                        "bg-danger":
                          data?.version?.local !== data?.version?.github,
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
                    <img
                      src="static://assets/Logo.svg"
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
                  {data?.system?.info?.map(
                    ({ key, value }: any, index: number) => (
                      <span key={index} className="lh-1 py-1">
                        <strong className="me-2">{key}:</strong>
                        <small>{value}</small>
                      </span>
                    )
                  )}
                </div>
              </DashboardBox>
              <DashboardBox name="myJumpData Help">
                <div>
                  <p>
                    <FaEnvelope className="me-2" />
                    <span>
                      <Link
                        to="mailto:myjumpdata@gmail.com"
                        className="text-main"
                      >
                        myJumpData@gmail.com
                      </Link>
                    </span>
                  </p>
                  <p>
                    <FaPhone className="me-2" />
                    <span>
                      <Link to="tel:+4917682763899" className="text-main me-2">
                        +46 176 8276 3899
                      </Link>
                      (Call, SMS, WhatsApp)
                    </span>
                  </p>
                  <p>
                    <FaBars className="me-2" />
                    <span>
                      <Link
                        to="https://myjumpdata.de/docs/category/myjumpdata--competition"
                        className="text-main me-2"
                        target="_blank"
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
          </div>
        </main>
      </div>
    </div>
  );
}

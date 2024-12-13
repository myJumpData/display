import classNames from "classnames";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Countdown } from "../components/display";
import DisplayFooter from "../components/DisplayFooter";
import Live from "../components/Live";
import Schedule from "../components/Schedule";
import { API } from "../lib/api";
import alphabetsNumToNum from "../lib/utils/alphabetNumToNum";

export const DISPLAY_COMPONENT_HEIGHT = 80;

let socket: any;

export default function Display() {
  const {
    data: display,
    isFetching,
    isError,
    isSuccess,
    refetch,
    isUninitialized,
  } = API.useGetDisplayQuery(
    {},
    {
      pollingInterval: 5000,
    }
  );

  const [dataLive, setDataLive] = useState<any>({});

  useEffect(() => {
    //fetch("/api/socket");
    socket = io("https://localhost:4444", {
      transports: ["websocket"],
    });
    return () => socket.off("connect");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    socket.onAny((event: string, ...args: any) => {
      const data = args[0];
      if (event === "DISPLAY:LIVE" && data.field) {
        setDataLive((prev: any) => {
          return {
            ...prev,
            [data.field]: data,
          };
        });
      }
      if (event === "DISPLAY:EVENT_POSITION") {
        if (!isUninitialized) {
          refetch();
        }
        setDataLive({});
      }
    });
    return () => socket.offAny();
  });
  return (
    <div data-bs-theme="dark">
      <div className="d-flex position-absolute top-0 left-0 right-0 bottom-0 text-body w-100">
        <main className="overflow-y-auto w-100 bg-gradient bg-black">
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100vh", overflow: "hidden" }}
          >
            <div
              className="flex-grow-1 justify-content-center align-items-center d-flex flex-column w-100 flex-shrink-1 overflow-hidden"
              style={{
                height: `${DISPLAY_COMPONENT_HEIGHT}vh`,
              }}
            >
              {(display?.component === "Live" && display?.data) ||
              display?.component === undefined ? (
                <Live data={display?.data} d={dataLive} />
              ) : display?.component === "Schedule" ? (
                <Schedule data={display?.data} />
              ) : display?.component === "Text" ? (
                <div
                  dangerouslySetInnerHTML={{ __html: display?.text }}
                  className="text-center"
                />
              ) : (
                <>
                  <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
                    {display?.nextBlockTime ? (
                      <div
                        className="text-white d-flex align-items-center justify-content-center font-monospace"
                        style={{
                          fontSize: "10vw",
                        }}
                      >
                        <Countdown time={display?.nextBlockTime} />
                      </div>
                    ) : null}
                    {display?.nextBlockName ? (
                      <div
                        className="text-white d-flex align-items-center justify-content-center"
                        style={{
                          fontSize: "5vw",
                        }}
                      >
                        <span>{display?.nextBlockName}</span>
                      </div>
                    ) : null}
                  </div>
                  {display?.nexts ? (
                    <div className="d-flex flex-wrap">
                      {display?.nexts?.map((next: any, index: number) => (
                        <div
                          key={index}
                          className={classNames("text-center", {
                            "w-50": display?.nexts?.length > 1,
                          })}
                          style={{
                            fontSize: "3vw",
                          }}
                        >
                          <span className="me-2">
                            Field {alphabetsNumToNum(next?.field)}:
                          </span>
                          <span className="text-white fw-bold">
                            {next?.element
                              ? `#${next?.startId} ${next?.name}`
                              : "EMPTY"}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </>
              )}
            </div>
            <DisplayFooter
              state={
                isFetching
                  ? "fetching"
                  : isError
                  ? "error"
                  : isSuccess
                  ? "success"
                  : undefined
              }
              heats={display?.position?.heats}
              heat={display?.position?.heat}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

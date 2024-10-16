import "bootstrap/dist/css/bootstrap.min.css";
import classNames from "classnames";
import type { AppProps } from "next/app";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../../lib/api";
import "./style.scss";

export default function App({ Component, pageProps }: AppProps | any) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);

  const getLayout =
    Component.getLayout || ((page: any) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        <title>myJumpData Competition</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </>
  );
}

function Layout({ children }: any) {
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
          <Link className="navbar-brand" href="/">
            <Image
              className="d-inline-block me-2"
              src="/myJumpData-Banner-white.svg"
              alt="myJumpData"
              height="40"
              width="30"
              style={{
                width: "auto",
                height: "2.5rem",
              }}
            />
          </Link>
          <ul className="navbar-nav w-100">
            <li className="nav-item ms-auto me-auto">
              <Link href="/display/1" className="nav-link" target="_blank">
                Display
              </Link>
            </li>
          </ul>
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
          <div style={{ minHeight: "fit-content" }}>{children}</div>
        </main>
      </div>
    </div>
  );
}

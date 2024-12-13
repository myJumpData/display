import { useEffect } from "react";
import { Provider } from "react-redux";
import { HashRouter, Route, Routes } from "react-router";
import { store } from "./lib/api";
import Display from "./pages/display";
import Main from "./pages/main";

export default function Wrapper() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);

  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/display" element={<Display />} />
          <Route path="/display/:id" element={<Display />} />
          <Route path="/display/:id/:limit" element={<Display />} />
          <Route path="/display/:id/:limit/:rows" element={<Display />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
}

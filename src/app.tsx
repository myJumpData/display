import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import { createRoot } from "react-dom/client";
import Wrapper from "./wrapper";

const root = createRoot(document.body);
root.render((<Wrapper />) as React.ReactElement);

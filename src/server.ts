import cors from "cors";
import express from "express";
import http from "http";
import moment from "moment";
import os from "node:os";
import { Server } from "socket.io";
import packageJson from "../package.json";
import { compareVersions } from "./lib/compareVersions";
import getApi from "./lib/getApi";
import getHWID from "./lib/getHWID";
import alphabetNumArray from "./lib/utils/alphabetNumArray";

export const PORT = 4444;

const app = express();
const server = (http as any).createServer(app);
const io = new Server(server);

app.options(
  "*",
  cors({
    origin: "*",
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  // Content Security Policy
  res.header(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self';"
  );
  next();
});
app.use(express.json());

app.get("/status", (req, res) => {
  res.status(200).send("OK");
});

app.get("/server", (req, res) => {
  return res.status(200).json({
    status: "online",
    version: packageJson.version,
  });
});

app.get("/local-server", (req, res) => {
  return fetch(getApi() + "/api/local-server", {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({
      "x-server-hwid": getHWID(),
      "x-server-version": packageJson.version,
      ipAdresses: Object.entries(os.networkInterfaces())
        ?.map(([k, v]: any) =>
          v
            ?.filter((x: any) => !x.internal && x.family === "IPv4")
            ?.map((x: any) => x.address)
        )
        ?.flat(),
      params: {
        ...req.query,
      },
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((r) => {
      return res.status(200).json(r);
    })
    .catch((e) => {
      return res.status(500).json({});
    });
});

app.get("/sys", async (req, res) => {
  try {
    let net: any = Object.entries(os.networkInterfaces());
    net = net
      ?.map(([k, v]: any) =>
        v
          ?.filter((x: any) => !x.internal && x.family === "IPv4")
          ?.map((x: any) => ({
            interface: k,
            address: x.address,
          }))
      )
      ?.flat();

    const cloud = await fetch(getApi() + "/status")
      .then((res) => {
        if (res.status === 200) {
          return true;
        }
        return null;
      })
      .catch(() => {
        return null;
      });
    await fetch(getApi() + "/api/local-server", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        "x-server-hwid": getHWID(),
        "x-server-version": packageJson.version,
        ipAdresses: Object.entries(os.networkInterfaces())
          ?.map(([k, v]: any) =>
            v
              ?.filter((x: any) => !x.internal && x.family === "IPv4")
              ?.map((x: any) => x.address)
          )
          ?.flat(),
        params: {},
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const githubVersion = await fetch(
      "https://raw.githubusercontent.com/myJumpData/display/refs/heads/main/package.json",
      {
        headers: {
          "User-Agent": "myJumpData-Display",
        },
      }
    )
      .then((r) => r.json())
      .then((r) => r?.version);

    return res.status(200).json({
      version: {
        local: packageJson.version,
        github: githubVersion,
        outdated: compareVersions(packageJson.version, githubVersion),
      },
      system: {
        network: net,
        info: Object.entries({
          Node: process.versions.node,
          V8Engine: process.versions.v8,
          Platform: process.platform,
          Uptime: moment().seconds(process.uptime()).format("HH:mm:ss"),
          Hostname: os.hostname(),
          HWID: getHWID(),
        }).map(([k, v]) => ({ key: k, value: v })),
      },
      cloud: {
        status: cloud,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send("");
  }
});

io.on("connection", (socket) => {
  socket.join(socket.id);
  console.log("Socket connected");
});

app.post("/api/live", async (req, res: any) => {
  try {
    if (req.body.code !== "SPDQ60") {
      return res.status(400).json({ error: "Invalid code" });
    }
    const fieldNumber = req.body?.key?.toLowerCase()?.split("field")?.[1];
    const fieldLetter = alphabetNumArray()[fieldNumber - 1];
    io.emit("DISPLAY:LIVE", {
      value: req.body?.count,
      field: fieldLetter.toLowerCase(),
    });
    return res.status(200).end();
  } catch (e) {
    console.error(e);
    return res.status(500).send("");
  }
});

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import os from "node:os";
import { compareVersions } from "../../../../lib/compareVersions";
import getApi from "../../../../lib/getApi";
import getHWID from "../../../../lib/getHWID";
import packageJson from "../../../../package.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
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
        .catch(() => null);
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
  } else if (req.method === "POST") {
    return res.status(405).send("");
  } else if (req.method === "PUT") {
    return res.status(405).send("");
  } else if (req.method === "DELETE") {
    return res.status(405).send("");
  }
  return res.status(405).send("");
}

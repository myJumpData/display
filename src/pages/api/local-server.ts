import { NextApiRequest, NextApiResponse } from "next";
import os from "node:os";
import getApi from "../../../lib/getApi";
import getHWID from "../../../lib/getHWID";
import packageJson from "../../../package.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    fetch(getApi() + "/api/local-server", {
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
      });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

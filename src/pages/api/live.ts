import { NextApiRequest, NextApiResponse } from "next";
import alphabetNumArray from "../../../lib/utils/alphabetNumArray";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse | any
) {
  if (req.method === "GET") {
  } else if (req.method === "POST") {
    if (req.body.code !== "SPDQ60") {
      return res.status(400).json({ error: "Invalid code" });
    }
    if (res.socket.server.io) {
      const fieldNumber = req.body?.key?.toLowerCase()?.split("field")?.[1];
      const fieldLetter = alphabetNumArray()[fieldNumber - 1];
      res.socket.server.io.emit("DISPLAY:LIVE", {
        value: req.body?.count,
        field: fieldLetter.toLowerCase(),
      });
      return res.status(200).end();
    }
    return res.status(500).json({ error: "Socket.io not initialized" });
  } else if (req.method === "PUT") {
  } else if (req.method === "DELETE") {
  }
  return res.status(405).send("");
}

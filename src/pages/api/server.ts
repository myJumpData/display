import { NextApiRequest, NextApiResponse } from "next";
import packageJson from "../../../package.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return res.status(200).json({
      status: "online",
      version: packageJson.version,
    });
  } else if (req.method === "POST") {
    return res.status(405).send("");
  } else if (req.method === "PUT") {
    return res.status(405).send("");
  } else if (req.method === "DELETE") {
    return res.status(405).send("");
  }
  return res.status(405).send("");
}

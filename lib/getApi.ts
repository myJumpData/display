export default function getApi() {
  return process.env["NODE_ENV"] === "development"
    ? "http://10.0.0.10:3000"
    : "https://portal.myjumpdata.de";
}

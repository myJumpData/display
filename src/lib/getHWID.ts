import { machineIdSync } from "node-machine-id";

export default function getHWID() {
  return machineIdSync(true);
}

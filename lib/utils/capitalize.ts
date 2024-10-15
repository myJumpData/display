export function capitalize(str: string) {
  if (!str) {
    return "";
  }
  return str
    .split(" ")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");
}

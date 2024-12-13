import numToAlphabetsNum from "./numToAlphabetsNum";

export default function alphabetNumArray(size: number = 26) {
  return Array.from({ length: size }, (_, i) => numToAlphabetsNum(i + 1));
}

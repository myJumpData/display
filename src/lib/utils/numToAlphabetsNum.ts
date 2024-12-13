export default function numToAlphabetsNum(input: number) {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const num =
    input - (alphabets.length + 1) * Math.floor(input / (alphabets.length + 1));

  return alphabets[num - 1];
}

export default function alphabetsNumToNum(input: string) {
  if (!input) return -1;
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const alphabetsArr = alphabets.split("");
  const alphabetsObj = alphabetsArr.reduce((acc: any, cur: any, i) => {
    acc[cur] = i + 1;
    return acc;
  }, {});
  const alphabetsNum = input
    .toUpperCase()
    .split("")
    .map((a) => alphabetsObj[a]);
  return Number(
    alphabetsNum
      .reverse()
      .reduce(
        (acc: any, cur: any, i: number) =>
          acc + cur + i * (alphabets.length - 1),
        0
      )
      .toString()
  );
}

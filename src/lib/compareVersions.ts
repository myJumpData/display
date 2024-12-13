interface Version {
  major: number;
  minor: number;
  patch: number;
}

export function parseVersion(version: string): Version {
  const [major, minor, patch] = version.split(".").map(Number);
  return { major, minor, patch };
}

export function compareVersions(v1: string, v2: string): Version {
  const parsedV1 = parseVersion(v1);
  const parsedV2 = parseVersion(v2);

  const compare = (a: number, b: number): number =>
    a === b ? 0 : a > b ? 1 : -1;

  const significantDifference = ["major", "minor", "patch"].find(key => {
    return (
      compare(
        parsedV1[key as keyof Version],
        parsedV2[key as keyof Version],
      ) !== 0
    );
  });

  if (significantDifference) {
    return {
      major:
        significantDifference === "major"
          ? compare(parsedV1.major, parsedV2.major)
          : 0,
      minor:
        significantDifference === "minor"
          ? compare(parsedV1.minor, parsedV2.minor)
          : 0,
      patch:
        significantDifference === "patch"
          ? compare(parsedV1.patch, parsedV2.patch)
          : 0,
    };
  }

  return { major: 0, minor: 0, patch: 0 };
}

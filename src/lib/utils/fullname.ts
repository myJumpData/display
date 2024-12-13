import { capitalize } from "./capitalize";

export default function fullname(
  user: any,
  reversed?: boolean,
  abbreviation?: boolean
) {
  if (!user) {
    return;
  }
  if (!user.firstname && !user.lastname) {
    if (user.username) {
      return user.username;
    }
    return;
  }
  const part_a = reversed ? user.lastname : user.firstname;
  const part_b = reversed ? user.firstname : user.lastname;
  if (part_a && part_a !== "" && part_b && part_b !== "") {
    return abbreviation
      ? `${capitalize(part_a)} ${part_b[0].toUpperCase()}.`
      : `${capitalize(part_a)} ${capitalize(part_b)}`;
  }
}

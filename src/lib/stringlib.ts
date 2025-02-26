export function capitalize(
  str: string,
  allWords: boolean = true,
  minLength: number = 0,
  upperCaseMinLength: boolean = false
): string {
  if (str.length < minLength) {
    if (upperCaseMinLength) {
      return str.toUpperCase();
    }
    return str;
  }

  if (allWords) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function ellipsis(
  str: string,
  length: number = 20,
  ellipsisText: string = "..."
): string {
  return str.length > length ? str.slice(0, length) + ellipsisText : str;
}

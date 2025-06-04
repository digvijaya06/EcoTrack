export function guessGender(name) {
  if (!name) return 'unknown';
  const lowerName = name.toLowerCase();

  // Simple heuristic examples
  const femaleEndings = ['a', 'e', 'i', 'y'];
  const maleEndings = ['o', 'r', 'n', 's'];

  // Check last character
  const lastChar = lowerName.charAt(lowerName.length - 1);

  if (femaleEndings.includes(lastChar)) {
    return 'female';
  } else if (maleEndings.includes(lastChar)) {
    return 'male';
  }
  return 'unknown';
}

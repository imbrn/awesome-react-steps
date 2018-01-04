export function wrapText(text, width, calc) {
  if (text === undefined || typeof text !== "string" || text.length === 0) {
    return [];
  }

  const words = text.split(" ");
  if (words.length === 1) {
    return words;
  }

  let line = words[0];
  let lineWidth = calc(line);
  const lines = [];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    if (lineWidth + calc(" " + word) > width) {
      lines.push(line);
      line = word;
      lineWidth = calc(word);
    } else {
      lineWidth += calc(" " + word);
      line += " " + word;
    }
  }

  lines.push(line);
  return lines;
}

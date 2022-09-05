// Copyright © 2022 Dpm Land. All Rights Reserved.

export const sideCharacters = '*';
export const edgeCharacters = '*';
export const centerCharacter = '*';

const fullLine = (l: number) => {
  let line = `/${edgeCharacters}`;
  line += centerCharacter.repeat(
    l - edgeCharacters.length * 2,
  );
  line += `${edgeCharacters}/\n`;
  return line;
};

const paddingLines = (l: number) => {
  let line = '//';
  line += ' '.repeat(l - line.length * 2);
  line += line;
  line += '\n';
  return line.repeat(1);
};

const contentLine = (l: number, line: string) => {
  const spaces = Math.max(
    (l - (sideCharacters.length * 2) - line.length) / 2,
    0,
  );
  const spaceLeft = spaces;
  const spaceRight = (spaces % 1 !== 0) ? spaces + 1 : spaces;
  return sideCharacters + ' '.repeat(spaceLeft) + line +
    ' '.repeat(spaceRight) + sideCharacters + '\n';
};

export function generateHeader(content: string) {
  // Magic
  const lines = content.split('\n');
  let maxLength = 0;
  lines.forEach((line) => maxLength = Math.max(maxLength, line.length));
  const l = Math.max(32, maxLength + sideCharacters.length * 2);
  let comment = fullLine(l);
  comment += paddingLines(l);
  lines.forEach((line) => {
    comment += contentLine(l, line);
  });
  comment += paddingLines(l);
  comment += fullLine(l);
  return comment;
}

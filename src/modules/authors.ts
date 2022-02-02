// Copyright © 2022 Dpm Land. All Rights Reserved.

// Add here if you help to dpm
const AUTHORS_DPM = [
  {
    name: 'TeoDev1611',
    social: 'https://twitter.com/TeoDev1611',
  },
];

// NOTE: Don't touch this if you are adding to the credits
// Table authors generator
import { table } from 'mods/deps.ts';

export function GetAuthors() {
  const t = table(AUTHORS_DPM, ['name', 'social'], {
    upcaseHeader: true,
    emptyReplacer: 'No field provided',
    padding: 4,
  });
  console.log(t);
}

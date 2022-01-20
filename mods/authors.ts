// Copyright © 2022 Dpm Land. All Rights Reserved.
// Add here if you help to dpm
export const AUTHORS_DPM = [
  {
    name: 'TeoDev1611',
    social: 'https://twitter.com/TeoDev1611',
  },
];

// Table authors generator
import { table } from 'https://deno.land/x/minitable@v1.0/mod.ts';

export function GetAuthors() {
  const t = table(AUTHORS_DPM, ['name', 'social'], {
    upcaseHeader: true,
    emptyReplacer: 'No field provided',
    padding: 4,
  });
  console.log(t);
}

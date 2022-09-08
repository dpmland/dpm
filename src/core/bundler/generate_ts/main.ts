// Copyright © 2022 Dpm Land. All Rights Reserved.

import { readImportMapFile } from 'json/reader.ts';
import { generateHeader } from 'bundler/generate_ts/magic.ts';

// TODO: Add the dependencies organized in groups by url from imports!
export async function generateTypescriptDep() {
  const imports = await readImportMapFile();

  let txt = `// Generated with DPM Please no modify!\n\n`;
  for (const i of Object.keys(imports.imports)) {
    txt += `// URL -> ${imports.imports[i]} || Module Name -> ${i}\n`;
    txt += `export * as ${i.replaceAll(/[^A-Za-z0-9]/g, '')} from "${
      imports.imports[i]
    }";\n`;
    console.log(generateHeader(imports.imports[i]));
  }
  console.log(txt);
}

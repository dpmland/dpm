// Copyright © 2024 Dpm Land. All Rights Reserved.

import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { writeFileFormatted } from 'json/utils/magicPrint.ts';
import { ImportMapInterface } from 'json/files.types.ts';

export async function writeImportMapFile(print?: boolean) {
  const content: ImportMapInterface = {
    imports: {},
  };
  // Magic Print
  await writeFileFormatted({
    content: JSON.stringify(
      content,
      null,
      '  ',
    ),
    path: BASE_DIRECTORIES.IMPORT_MAPS,
    name: NAME_DIRECTORIES.IMPORT_MAPS,
    type: 'json',
    print: print,
  });
}

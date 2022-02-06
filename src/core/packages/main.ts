// Copyright © 2022 Dpm Land. All Rights Reserved.

import { appendModuleToDpm, appendOptions } from 'packages/add.ts';
import { dracoFiles } from 'mods/deps.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';
import { ReadImportMapFile } from 'dpm/read.ts';

export async function installDepsToImports(
  depName: Array<string>,
  options: appendOptions = {},
) {
  if (!(dracoFiles.exists(BASE_DIRECTORIES.IMPORT_MAPS))) {
    LOGGER.error('Import maps file not found run dpm init --importMap');
    Deno.exit(2);
  }
  const data = await ReadImportMapFile();
  const mods = appendModuleToDpm(depName, options);
  console.log(data);
  console.log(mods);
}

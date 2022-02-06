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
  // TODO(Teo IDEA): Check if generate the import map and not show the error
  if (!(dracoFiles.exists(BASE_DIRECTORIES.IMPORT_MAPS))) {
    LOGGER.error('Import maps file not found run dpm init --importMap');
    Deno.exit(2);
  }
  const data = await ReadImportMapFile();
  const mods = appendModuleToDpm(depName, options);
  const imports = data.imports;
  options.host = (typeof options.host == 'undefined')
    ? 'https://deno.land/x'
    : options.host;
  for (const i of mods) {
    const splited = i.replace(options.host, ' ');
    const pkg = splited.split('/');
    imports[pkg[1]] = i;
  }
  await Deno.writeTextFile(
    BASE_DIRECTORIES.IMPORT_MAPS,
    JSON.stringify(data, null, '  '),
  );
  LOGGER.info(
    `Successfully installed the dependencies into ${NAME_DIRECTORIES.IMPORT_MAPS}`,
  );
}

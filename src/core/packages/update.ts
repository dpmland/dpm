// Copyright © 2022 Dpm Land. All Rights Reserved.

import { checkVersion } from 'checker/main.ts';
import { dracoFiles } from 'mods/deps.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';

export async function updateImportMap() {
  LOGGER.info(`Checking updates from ${NAME_DIRECTORIES.IMPORT_MAPS} file...`);
  if (dracoFiles.exists(BASE_DIRECTORIES.IMPORT_MAPS)) {
    await checkVersion(BASE_DIRECTORIES.IMPORT_MAPS);
    Deno.exit();
  }
  LOGGER.error(
    `${NAME_DIRECTORIES.IMPORT_MAPS} file not found check if exists or initialize with dpm init --importMap`,
  );
  Deno.exit(2);
}

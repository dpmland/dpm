// Copyright © 2022 Dpm Land. All Rights Reserved.

import { checkVersion, writeNewVersions } from 'core/checker/main.ts';
import { dracoFiles } from 'mods/deps.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';
import { ReadImportMapFile } from 'dpm/read.ts';

export async function checkUpdates() {
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

export async function writeUpdates() {
  LOGGER.info(`Checking updates from ${NAME_DIRECTORIES.IMPORT_MAPS} file...`);
  if (
    dracoFiles.exists(BASE_DIRECTORIES.IMPORT_MAPS) &&
    dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE)
  ) {
    const [content, importMap] = await Promise.all([
      writeNewVersions(BASE_DIRECTORIES.IMPORT_MAPS),
      ReadImportMapFile(),
    ]);

    importMap.imports = content;

    await Deno.writeTextFile(
      BASE_DIRECTORIES.IMPORT_MAPS,
      JSON.stringify(importMap, null, '  '),
    );

    LOGGER.info(
      `Successfully updated the dependencies and writed in the ${NAME_DIRECTORIES.IMPORT_MAPS}`,
    );
    Deno.exit();
  }
}

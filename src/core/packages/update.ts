// Copyright © 2022 Dpm Land. All Rights Reserved.

import {
  checkVersion,
  NewObject,
  writeNewVersions,
} from 'core/checker/main.ts';
import { dracoFiles } from 'mods/deps.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';
import { ReadDpmFile, ReadImportMapFile } from 'dpm/read.ts';

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
    dracoFiles.exists(BASE_DIRECTORIES.IMPORT_MAPS)
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
  } else {
    LOGGER.error(
      `Not found in the current directory the ${NAME_DIRECTORIES.IMPORT_MAPS}`,
    );
    Deno.exit(2);
  }
}

export async function updateDPMFiles() {
  LOGGER.info(
    `Getting the updates from ${NAME_DIRECTORIES.IMPORT_MAPS} file...`,
  );
  if (
    dracoFiles.exists(BASE_DIRECTORIES.IMPORT_MAPS) &&
    dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE)
  ) {
    const [imports, dpm] = await Promise.all([
      ReadImportMapFile(),
      ReadDpmFile(),
    ]);

    const obj: NewObject = {};
    for (const i of Object.keys(imports.imports)) {
      obj[`${i.replace('/', '')}/`] = imports.imports[i].split('@')[1].replace(
        '/',
        '',
      );
    }

    dpm.dependencies = obj;

    await Deno.writeTextFile(
      BASE_DIRECTORIES.DPM_FILE,
      JSON.stringify(dpm, null, '  '),
    );

    LOGGER.info(
      `Successfully updated the dependencies and writed in the ${NAME_DIRECTORIES.DPM_FILE}`,
    );
  } else {
    LOGGER.error(
      `Not found in the current directory the ${NAME_DIRECTORIES.DPM_FILE}`,
    );
    Deno.exit(2);
  }
}

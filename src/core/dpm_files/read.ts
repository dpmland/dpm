// Copyright © 2022 Dpm Land. All Rights Reserved.

import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';

export async function ReadDpmFile() {
  try {
    return JSON.parse(await Deno.readTextFile(BASE_DIRECTORIES.DPM_FILE));
  } catch (e) {
    LOGGER.error(e.message);
  }
}

export async function ReadImportMapFile() {
  const file = await ReadDpmFile();
  let filename;
  if (file.config.importMap.directory == false) {
    filename = BASE_DIRECTORIES.IMPORT_MAPS;
  } else {
    filename = BASE_DIRECTORIES.IMPORT_MAPS_DIR;
  }
  filename = (typeof filename == 'undefined')
    ? BASE_DIRECTORIES.IMPORT_MAPS
    : filename;
  try {
    return JSON.parse(await Deno.readTextFile(filename));
  } catch (e) {
    LOGGER.error(e.message);
  }
}

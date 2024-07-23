// Copyright © 2024 Dpm Land. All Rights Reserved.

import { Run } from 'runner/main.ts';
import { dracoFiles } from 'mods/deps.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';

export async function FormatInternalJSON() {
  LOGGER.info('Formatting the files...');
  const FILES_TO_FMT = [];
  if (dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE)) {
    FILES_TO_FMT.push(BASE_DIRECTORIES.DPM_FILE);
  }
  if (dracoFiles.exists(BASE_DIRECTORIES.README)) {
    FILES_TO_FMT.push(BASE_DIRECTORIES.README);
  }
  if (dracoFiles.exists(BASE_DIRECTORIES.IMPORT_MAPS)) {
    FILES_TO_FMT.push(BASE_DIRECTORIES.IMPORT_MAPS);
  }
  if (dracoFiles.exists(BASE_DIRECTORIES.EGGS_FILE)) {
    FILES_TO_FMT.push(BASE_DIRECTORIES.EGGS_FILE);
  }
  await Run(`deno fmt ${FILES_TO_FMT.join(' ')}`);
}

// Copyright © 2022 Dpm Land. All Rights Reserved.

import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';
import { dracoFiles } from 'mods/deps.ts';
import { readDepsFile } from 'dpm/deps.ts';

export async function addToDepsFile() {
  await readDepsFile();
}

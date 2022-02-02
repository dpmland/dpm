// Copyright © 2022 Dpm Land. All Rights Reserved.

import { dracoFiles, join } from 'mods/deps.ts';

export const BASE_DIRECTORIES = {
  LOGS: join(dracoFiles.cacheDir('DPM')!, 'logs'),
  CONFIG: join(dracoFiles.cacheDir('DPM')!, 'config'),
  DOCS: join(dracoFiles.cacheDir('DPM')!, 'docs'),
  DPM_FILE: join(dracoFiles.currentDir(), 'dpm.json'),
  DENO_JSON_FILE: join(dracoFiles.currentDir(), 'deno.json'),
  IMPORT_MAPS: join(dracoFiles.currentDir(), 'dpm_imports.json'),
  EGGS_FILE: join(dracoFiles.currentDir(), 'eggs.json'),
  DEPS_FILE_ONLY: join(dracoFiles.currentDir(), 'deps.ts'),
  DEPS_DIR: join(dracoFiles.currentDir(), 'dpm_deps', 'deps.ts'),
};

// Copyright © 2022 Dpm Land. All Rights Reserved.

import { dracoFiles, join } from 'mods/deps.ts';

// Types
interface directories {
  LOGS: string;
  CONFIG: string;
  DOCS: string;
  DPM_FILE: string;
  DENO_JSON_FILE: string;
  IMPORT_MAPS: string;
  EGGS_FILE: string;
  DEPS_FILE_ONLY: string;
  DEPS_DIR: string;
}

interface names {
  DPM_FILE: string;
  DENO_JSON_FILE: string;
  IMPORT_MAPS: string;
  EGGS_FILE: string;
  DEPS_FILE_ONLY: string;
  DEPS_DIR: string;
}

export const BASE_DIRECTORIES: directories = {
  LOGS: join(dracoFiles.cacheDir('DPM')!, 'logs'),
  CONFIG: join(dracoFiles.cacheDir('DPM')!, 'config'),
  DOCS: join(dracoFiles.cacheDir('DPM')!, 'docs'),
  DPM_FILE: join(dracoFiles.currentDir(), 'dpm.json'),
  DENO_JSON_FILE: join(dracoFiles.currentDir(), 'deno.json'),
  IMPORT_MAPS: join(dracoFiles.currentDir(), 'dpm_imports.json'),
  EGGS_FILE: join(dracoFiles.currentDir(), 'eggs.json'),
  DEPS_FILE_ONLY: join(dracoFiles.currentDir(), 'deps.ts'),
  DEPS_DIR: join(dracoFiles.currentDir(), 'dpm_modules', 'deps.ts'),
};

export const NAME_DIRECTORIES: names = {
  DPM_FILE: 'dpm.json',
  DENO_JSON_FILE: 'deno.json',
  IMPORT_MAPS: 'dpm_imports.json',
  EGGS_FILE: 'eggs.json',
  DEPS_FILE_ONLY: 'deps.ts',
  DEPS_DIR: join('dpm_modules', 'deps.ts'),
};

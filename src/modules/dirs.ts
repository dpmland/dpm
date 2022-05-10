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
  IMPORT_MAPS_DIR: string;
  EGGS_FILE: string;
  README: string;
  TEMP: string;
}

interface names {
  DPM_FILE: string;
  DENO_JSON_FILE: string;
  IMPORT_MAPS: string;
  IMPORT_MAPS_DIR: string;
  EGGS_FILE: string;
  README: string;
  TEMP: string;
}

export const BASE_DIRECTORIES: directories = {
  LOGS: join(dracoFiles.cacheDir('DPM')!, 'logs'),
  CONFIG: join(dracoFiles.cacheDir('DPM')!, 'config'),
  DOCS: join(dracoFiles.cacheDir('DPM')!, 'docs'),
  DPM_FILE: join(dracoFiles.currentDir(), 'dpm.json'),
  DENO_JSON_FILE: join(dracoFiles.currentDir(), '.dpm', 'deno.json'),
  IMPORT_MAPS: join(dracoFiles.currentDir(), 'dpm_imports.json'),
  IMPORT_MAPS_DIR: join(dracoFiles.currentDir(), '.dpm', 'dpm_imports.json'),
  EGGS_FILE: join(dracoFiles.currentDir(), 'eggs.json'),
  README: join(dracoFiles.currentDir(), 'README.md'),
  TEMP: join(dracoFiles.cacheDir('DPM')!, 'bin'),
};

export const NAME_DIRECTORIES: names = {
  DPM_FILE: 'dpm.json',
  DENO_JSON_FILE: join('.dpm', 'deno.json'),
  IMPORT_MAPS: 'dpm_imports.json',
  IMPORT_MAPS_DIR: join('.dpm', 'dpm_imports.json'),
  EGGS_FILE: 'eggs.json',
  README: 'README.md',
  TEMP: join('SYSTEM_TEMP_FOLDER', 'DPM'),
};

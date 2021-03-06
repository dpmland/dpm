// Copyright © 2022 Dpm Land. All Rights Reserved.

import { dracoFiles, dracoInfo, join } from 'mods/deps.ts';

// Os Deno Name
let denoName;

if (dracoInfo.platform() == 'windows') {
  denoName = 'deno.exe';
} else if (
  dracoInfo.platform() == 'linux' || dracoInfo.platform() == 'darwin'
) {
  denoName = 'deno';
}

// None to the Deno Name if is Undefined!
denoName = (typeof denoName == 'undefined') ? '' : denoName;

// Types
export interface directories {
  LOGS: string;
  CONFIG: string;
  DOCS: string;
  DPM_FILE: string;
  DENO_JSON_FILE: string;
  IMPORT_MAPS: string;
  EGGS_FILE: string;
  README: string;
  TEMP: string;
  DENO_EXEC: string;
}

export interface names {
  DPM_FILE: string;
  DENO_JSON_FILE: string;
  IMPORT_MAPS: string;
  EGGS_FILE: string;
  README: string;
  TEMP: string;
  DENO_EXEC: string;
}

export const BASE_DIRECTORIES: directories = {
  LOGS: join(dracoFiles.cacheDir('DPM')!, 'logs'),
  CONFIG: join(dracoFiles.cacheDir('DPM')!, 'config'),
  DOCS: join(dracoFiles.cacheDir('DPM')!, 'docs'),
  DPM_FILE: join(dracoFiles.currentDir(), 'dpm.json'),
  DENO_JSON_FILE: join(dracoFiles.currentDir(), 'deno.json'),
  IMPORT_MAPS: join(dracoFiles.currentDir(), 'dpm_imports.json'),
  EGGS_FILE: join(dracoFiles.currentDir(), 'eggs.json'),
  README: join(dracoFiles.currentDir(), 'README.md'),
  TEMP: join(dracoFiles.cacheDir('DPM')!, 'bin'),
  DENO_EXEC: join(dracoFiles.homeDir()!, '.deno', 'bin', denoName),
};

export const NAME_DIRECTORIES: names = {
  DPM_FILE: 'dpm.json',
  DENO_JSON_FILE: 'deno.json',
  IMPORT_MAPS: 'dpm_imports.json',
  EGGS_FILE: 'eggs.json',
  README: 'README.md',
  TEMP: join('SYSTEM_TEMP_FOLDER', 'DPM'),
  DENO_EXEC: join('.deno', 'bin', denoName),
};

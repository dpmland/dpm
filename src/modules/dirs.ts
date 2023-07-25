// Copyright © 2022 Dpm Land. All Rights Reserved.

import { directory, dracoInfo, join } from 'mods/deps.ts';

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
  INSTALLER: string;
  EGGS_FILE: string;
  README: string;
  TEMP: string;
  DENO_EXEC: string;
  LICENSE_DIR: string;
  DEPS_BUNDLE: string;
  TEMPLATE_DIR: string;
}

export interface names {
  DPM_FILE: string;
  DENO_JSON_FILE: string;
  IMPORT_MAPS: string;
  INSTALLER: string;
  EGGS_FILE: string;
  README: string;
  TEMP: string;
  DENO_EXEC: string;
  DEPS_BUNDLE: string;
}

export const BASE_DIRECTORIES: directories = {
  LOGS: join(directory.default('cache')!, 'DPM', 'logs'),
  CONFIG: join(directory.default('cache')!, 'DPM', 'config'),
  DOCS: join(directory.default('cache')!, 'DPM', 'docs'),
  LICENSE_DIR: join(directory.default('cache')!, 'DPM', 'licenses'),
  TEMPLATE_DIR: join(directory.default('cache')!, 'DPM', 'templates'),
  DPM_FILE: join(Deno.cwd(), 'dpm.json'),
  DENO_JSON_FILE: join(Deno.cwd(), 'deno.json'),
  IMPORT_MAPS: join(Deno.cwd(), 'import_map.json'),
  EGGS_FILE: join(Deno.cwd(), 'eggs.json'),
  README: join(Deno.cwd(), 'README.md'),
  TEMP: join(directory.default('cache')!, 'DPM', 'bin'),
  DENO_EXEC: join(directory.default('home')!, '.deno', 'bin', denoName),
  DEPS_BUNDLE: join(Deno.cwd(), 'deps.ts'),
  INSTALLER: join(Deno.cwd(), 'installer.ts'),
};

export const NAME_DIRECTORIES: names = {
  DPM_FILE: 'dpm.json',
  DENO_JSON_FILE: 'deno.json',
  IMPORT_MAPS: 'import_map.json',
  DEPS_BUNDLE: 'deps.ts',
  EGGS_FILE: 'eggs.json',
  INSTALLER: 'installer.ts',
  README: 'README.md',
  TEMP: join('SYSTEM_TEMP_FOLDER', 'DPM'),
  DENO_EXEC: join('.deno', 'bin', denoName),
};

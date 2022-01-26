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
  try {
    return JSON.parse(await Deno.readTextFile(BASE_DIRECTORIES.IMPORT_MAPS));
  } catch (e) {
    LOGGER.error(e.message);
  }
}

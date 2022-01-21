import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';

export async function ReadDpmFile() {
  try {
    return JSON.parse(await Deno.readTextFile(BASE_DIRECTORIES.DPM_FILE));
  } catch (e) {
    LOGGER.error(e.message);
  }
}

export function AppendModuleToDpm(
  depName: Array<string>,
  host?: string,
): Array<string> {
  host = (typeof host == 'undefined') ? 'deno.land' : host;
  const url = [];
  for (const i of depName) {
    let URL_COMPLETE;
    const dep = i.split('/');
    if (dep[0] == 'std') {
      URL_COMPLETE = `https://${host}/std/${i.replace('std/', '')}`;
    } else {
      URL_COMPLETE = `https://${host}/x/${i}`;
    }
    url.push(URL_COMPLETE);
  }
  return url;
}

export async function ReadImportMapFile() {
  try {
    return JSON.parse(await Deno.readTextFile(BASE_DIRECTORIES.IMPORT_MAPS));
  } catch (e) {
    LOGGER.error(e.message);
  }
}

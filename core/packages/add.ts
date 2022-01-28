import { dirname } from 'mods/deps.ts';
import { LOGGER } from 'mods/logger.ts';

// Types
export interface appendOptions {
  host?: string;
  std?: boolean;
}

export function appendModuleToDpm(
  depName: Array<string>,
  options: appendOptions = {},
) {
  const url = [];
  if (typeof options.host == 'boolean') {
    LOGGER.error('Host is necessary a value!');
    Deno.exit();
  }
  options.host = (typeof options.host == 'undefined')
    ? 'deno.land/x'
    : options.host;
  for (const i of depName) {
    const URL_COMPLETE = dirname(`https://${options.host}/${i}`);
    url.push(`${URL_COMPLETE}/`);
  }
  return url;
}

// Copyright © 2022 Dpm Land. All Rights Reserved.

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
    const splited = i.split('/');
    if (splited.length > 2) {
      LOGGER.error('Only supported 2 deps to install');
      Deno.exit(1);
    }
    let URL_COMPLETE;
    if (i.endsWith('.ts') || i.endsWith('.js')) {
      URL_COMPLETE = dirname(`https://${options.host}/${i}`);
    } else {
      URL_COMPLETE = `https://${options.host}/${i}/`;
    }
    if (URL_COMPLETE.endsWith('/') == false) {
      URL_COMPLETE += '/';
    }
    url.push(URL_COMPLETE);
  }
  return url;
}

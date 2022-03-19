// Copyright © 2022 Dpm Land. All Rights Reserved.

import { dirname } from 'mods/deps.ts';
import { LOGGER } from 'mods/logger.ts';
import { soxa } from 'mods/deps.ts';

// Types
export interface appendOptions {
  host?: string;
  std?: boolean;
}

// URLS
const url = 'https://cdn.deno.land/std/meta/versions.json';
const denoRegister = 'https://deno.land/x';

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
    ? 'https://deno.land/x'
    : options.host;
  for (const i of depName) {
    const splited = i.split('/');
    if (splited.length > 2) {
      LOGGER.error(
        'Only supported 2 deps to install syntax < packageName/packagefolder > or < packagename/file.ts > more info on < dpm doc install.syntax>',
      );
      Deno.exit(1);
    }
    let URL_COMPLETE;
    if (i.endsWith('.ts') || i.endsWith('.js')) {
      URL_COMPLETE = dirname(`${options.host}/${i}`);
    } else {
      URL_COMPLETE = `${options.host}/${i}/`;
    }
    if (URL_COMPLETE.endsWith('/') == false) {
      URL_COMPLETE += '/';
    }
    url.push(URL_COMPLETE);
  }
  return url;
}

export async function appendStdToFile(
  depName: Array<string>,
) {
  // Get the latest version of
  const version = await soxa.get(url)
    .catch((error) => {
      LOGGER.error(`Error getting the latest dependency ${error}`);
    });
  // Helper Variable
  let latest;
  const std = [];
  if (version.data) {
    latest = version.data.latest;
  } else {
    latest = '';
  }
  for (const i of depName) {
    let URL_COMPLETE = '';
    if (latest == '') {
      LOGGER.error(`Not found the latest version of the std!`);
      Deno.exit(2);
    }
    URL_COMPLETE += `${denoRegister}/std@${latest}/${i}/`;
    std.push(URL_COMPLETE);
  }
  return std;
}

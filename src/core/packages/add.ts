// Copyright © 2022 Dpm Land. All Rights Reserved.

import { dirname } from 'mods/deps.ts';
import { LOGGER } from 'mods/logger.ts';
import { httpClient } from 'mods/http.ts';

// Types
export interface appendOptions {
  host?: string;
  std?: boolean;
}

// URLS
const url = 'https://cdn.deno.land/std/meta/versions.json';
const urlESM = 'https://esm.sh';
const denoRegister = 'https://deno.land/x';

export function appendModuleToDpm(
  depName: string[],
  options: appendOptions = {},
): string[] {
  const url = [];
  if (typeof options.host == 'boolean') {
    LOGGER.error('Host is necessary a value!');
    Deno.exit();
  }
  options.host = (typeof options.host == 'undefined')
    ? 'https://deno.land/x'
    : options.host;

  if (options.host == 'https://esm.sh' || options.host == 'esm.sh') {
    LOGGER.warn(`Use dpm install --esm thePackage insead this!!!`);
    Deno.exit();
  }

  for (const i of depName) {
    const splited = i.split('/');
    if (splited.length > 2) {
      LOGGER.error(
        'Only supported 2 deps to install syntax < packageName/packagefolder > or < packagename/file.ts > more info on < dpm doc install >',
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
  depName: string[],
): Promise<string[]> {
  // Get the latest version of
  const version = await httpClient(url);
  // Helper Variable
  let latest;
  const std = [];
  if (version.latest) {
    latest = version.latest;
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

export async function esmGetVersion(depName: string[]): Promise<string[]> {
  const urls = [];
  for (const i of depName) {
    const url = `${urlESM}/${i}`;
    const response = await httpClient(url).then((data) => {
      return data.split('\n', 1)[0].substring(12).replace(
        '*/',
        '',
      );
    });

    urls.push(`${urlESM}/${response}`);
  }
  return urls;
}

export async function getTheVersionOfDep(
  dep: string,
  host: string,
): Promise<string> {
  if (host == 'https://deno.land/x') {
    if (dep.includes('@')) {
      return ``;
    }
    const url = `https://cdn.deno.land/${dep}/meta/versions.json`;
    const versionList = await httpClient(url);
    if (versionList.latest) {
      return versionList.latest;
    }
  }
  return '';
}

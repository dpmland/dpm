// Copyright © 2022 Dpm Land. All Rights Reserved.

import { appendModuleToDpm, appendOptions } from 'packages/add.ts';
import { dracoFiles } from 'mods/deps.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';
import { ReadImportMapFile } from 'dpm/read.ts';
import { WriteImportMapJson } from 'dpm/init.ts';
import { soxa } from 'mods/deps.ts';

export async function installDepsToImports(
  depName: Array<string>,
  options: appendOptions = {},
) {
  if (!(dracoFiles.exists(BASE_DIRECTORIES.IMPORT_MAPS))) {
    await WriteImportMapJson();
  }
  const data = await ReadImportMapFile();
  const mods = appendModuleToDpm(depName, options);
  const imports = data.imports;
  options.host = (typeof options.host == 'undefined')
    ? 'https://deno.land/x'
    : options.host;
  for (const i of mods) {
    const splited = i.replace(options.host, ' ');
    const pkg = splited.split('/');
    const version = await getTheVersionOfDep(pkg[1], options.host);
    if (version == '') {
      imports[`${pkg[1]}/`] = i;
    } else {
      imports[`${pkg[1]}/`] = `${options.host}/${pkg[1]}@${version}/`;
    }
  }
  await Deno.writeTextFile(
    BASE_DIRECTORIES.IMPORT_MAPS,
    JSON.stringify(data, null, '  '),
  );
  LOGGER.info(
    `Successfully installed the dependencies into ${NAME_DIRECTORIES.IMPORT_MAPS}`,
  );
}

async function getTheVersionOfDep(
  dep: string,
  host: string,
): Promise<string> {
  if (host == 'https://deno.land/x') {
    if (dep.includes('@')) {
      return ``;
    }
    const url = `https://cdn.deno.land/${dep}/meta/versions.json`;
    const versionList = await soxa.get(url)
      .catch((err) => {
        LOGGER.error(`ERROR Getting the version from deno.land host: ${err}`);
      });
    if (versionList.data) {
      return versionList.data.latest;
    }
  }
  return '';
}

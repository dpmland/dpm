// Copyright © 2022 Dpm Land. All Rights Reserved.

import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';
import { dracoFiles } from 'mods/deps.ts';
// import { readDepsFile } from 'dpm/deps.ts';
import { ReadDpmFile } from 'dpm/read.ts';
import { appendModuleToDpm, appendOptions } from 'packages/add.ts';
import { getTheVersionOfDep } from 'packages/main.ts';

export type listDeps = {
  name: string;
  url: string;
};

export async function addToDepsFile(
  deps: Array<string>,
  options: appendOptions = {},
) {
  if (!(dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE))) {
    LOGGER.error(
      `The ${NAME_DIRECTORIES.DPM_FILE} file not found! check if exists or reinitialize with << dpm init --dpm >>`,
    );
    Deno.exit(2);
  }
  // const dps = await readDepsFile();
  const file = await ReadDpmFile();
  if (file.config.depsFile.enable == true) {
    const result: listDeps[] = [];
    const mods = appendModuleToDpm(deps, options);
    options.host = (typeof options.host == 'undefined')
      ? 'https://deno.land/x'
      : options.host;
    for (const i of mods) {
      const splited = i.replace(options.host, ' ');
      const pkg = splited.split('/');
      const version = await getTheVersionOfDep(pkg[1], options.host);
      if (version == '') {
        result.push({
          name: `${pkg[1]}`,
          url: i,
        });
      } else {
        result.push({
          name: `${pkg[1]}`,
          url: `${options.host}/${pkg[1]}@${version}/`,
        });
      }
    }
    console.log('file');
    if (file.config.depsFile.directory == true) {
      console.log('directory');
    }
    console.log(result);
  }
}

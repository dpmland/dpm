// Copyright © 2022 Dpm Land. All Rights Reserved.

import { dracoFiles } from 'mods/deps.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';
import { ReadDpmFile, ReadImportMapFile } from 'dpm/read.ts';

export async function cleanAllDeps() {
  if (dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE)) {
    const file = await ReadDpmFile();
    const imports = await ReadImportMapFile();
    if (!('dependencies' in file)) {
      LOGGER.error(
        'Dependencies key not found! check the documentation with << dpm doc init.syntax >>',
      );
      Deno.exit(2);
    }
    if (file.config.importMap == true) {
      if (!('imports' in imports)) {
        LOGGER.error(
          'Imports key not found! check the documentation with << dpm doc init.syntax >> ',
        );
        Deno.exit(2);
      }
      const imp = imports.imports;
      Object.keys(imp).forEach((k) => delete imp[k]);
    }
    if (file.config.depsFile == true) {
      LOGGER.warn('Working in this feature!');
      Deno.exit();
    }
    const deps = file.dependencies;
    Object.keys(deps).forEach((k) => delete deps[k]);
    await Deno.writeTextFile(
      BASE_DIRECTORIES.DPM_FILE,
      JSON.stringify(file, null, '  '),
    );
    await Deno.writeTextFile(
      BASE_DIRECTORIES.IMPORT_MAPS,
      JSON.stringify(imports, null, '  '),
    );
    LOGGER.info(
      `Cleaned successfully the ${NAME_DIRECTORIES.DPM_FILE} and the ${NAME_DIRECTORIES.IMPORT_MAPS}!`,
    );
    Deno.exit();
  }
  LOGGER.error(
    'Dpm file not found! Init a dpm project with << dpm init -A >> or check the documentation with << dpm doc init >>',
  );
  Deno.exit(2);
}

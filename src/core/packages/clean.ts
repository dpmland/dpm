// Copyright © 2022 Dpm Land. All Rights Reserved.

import { dracoFiles } from 'mods/deps.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';
import { ReadDpmFile, ReadImportMapFile } from 'dpm/read.ts';

// Delete all dependencies from the files!
// The import map file and the dpm dependencies file!
export async function cleanAllDeps() {
  if (dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE)) {
    const file = await ReadDpmFile();
    const imports = await ReadImportMapFile();
    // Delete the imports data
    if (!('imports' in imports)) {
      LOGGER.error(
        'Imports key not found! check the documentation with << dpm doc init.syntax >> ',
      );
      Deno.exit(2);
    }
    const imp = imports.imports;
    Object.keys(imp).forEach((k) => delete imp[k]);
    // Delete the dependency key
    if (!('dependencies' in file)) {
      LOGGER.error(
        'Dependencies key not found! check the documentation with << dpm doc init.syntax >>',
      );
      Deno.exit(2);
    }
    const deps = file.dependencies;
    Object.keys(deps).forEach((k) => delete deps[k]);
    // Write with the new data
    await Deno.writeTextFile(
      BASE_DIRECTORIES.DPM_FILE,
      JSON.stringify(file, null, '  '),
    );
    await Deno.writeTextFile(
      BASE_DIRECTORIES.IMPORT_MAPS,
      JSON.stringify(imports, null, '  '),
    );
    // Show thats a good end!
    LOGGER.info(
      `Cleaned successfully the ${NAME_DIRECTORIES.DPM_FILE} and the ${NAME_DIRECTORIES.IMPORT_MAPS}!`,
    );
    Deno.exit();
  }
  // Show error
  LOGGER.error(
    'Dpm file not found! Init a dpm project with << dpm init -A >> or check the documentation with << dpm doc init >>',
  );
  Deno.exit(2);
}

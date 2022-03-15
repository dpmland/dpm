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

    // Write with the .dpm folder check!
    if (file.config.importMap.directory) {
      await Deno.writeTextFile(
        BASE_DIRECTORIES.IMPORT_MAPS_DIR,
        JSON.stringify(imports, null, '  '),
      );
    }

    await Deno.writeTextFile(
      BASE_DIRECTORIES.IMPORT_MAPS,
      JSON.stringify(imports, null, '  '),
    );

    // Show thats a good end!
    if (file.config.importMap.directory) {
      LOGGER.info(
        `Cleaned successfully the ${NAME_DIRECTORIES.DPM_FILE} and the ${NAME_DIRECTORIES.IMPORT_MAPS_DIR}!`,
      );
      Deno.exit();
    }

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

export async function cleanAnyDependency(deps: string[]) {
  if (dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE)) {
    // Read the files!
    const file = await ReadDpmFile();
    const imports = await ReadImportMapFile();

    // Check if exists imports and if exists dependencies
    if (!('imports' in imports)) {
      LOGGER.error(
        'Imports key not found! check the documentation with << dpm doc init.syntax >> ',
      );
      Deno.exit(2);
    }

    if (!('dependencies' in file)) {
      LOGGER.error(
        'Dependencies key not found! check the documentation with << dpm doc init.syntax >>',
      );
      Deno.exit(2);
    }

    // Helper consts!
    const f = file.dependencies;
    const imp = imports.imports;

    console.info('Cleanning the dependencies.... ');
    for (const i of deps) {
      if (Object.hasOwn(f, i)) {
        Object.keys(f).forEach((_k) => delete f[i]);
      } else {
        LOGGER.warn(
          `Not found the ${i} dependency in the ${NAME_DIRECTORIES.DPM_FILE}`,
        );
      }
      if (Object.hasOwn(imp, `${i}/`)) {
        Object.keys(imp).forEach((_k) => delete imp[`${i}/`]);
      } else {
        if (file.config.importMap.directory) {
          LOGGER.warn(
            `Not found the ${i} dependency in the ${NAME_DIRECTORIES.IMPORT_MAPS_DIR}`,
          );
        }
        LOGGER.warn(
          `Not found the ${i} dependency in the ${NAME_DIRECTORIES.IMPORT_MAPS}`,
        );
      }
    }

    // Update the DPM File
    await Deno.writeTextFile(
      BASE_DIRECTORIES.DPM_FILE,
      JSON.stringify(file, null, '  '),
    );

    // Update the import map file!
    if (file.config.importMap.directory) {
      await Deno.writeTextFile(
        BASE_DIRECTORIES.IMPORT_MAPS_DIR,
        JSON.stringify(imports, null, '  '),
      );

      LOGGER.info(
        `Cleanned successfully! ${
          deps.join(' ')
        } -> On ${NAME_DIRECTORIES.DPM_FILE} ${NAME_DIRECTORIES.IMPORT_MAPS_DIR}`,
      );
      Deno.exit();
    }

    await Deno.writeTextFile(
      BASE_DIRECTORIES.IMPORT_MAPS,
      JSON.stringify(imports, null, '  '),
    );

    LOGGER.info(
      `Cleanned successfully! ${
        deps.join(' ')
      } -> On ${NAME_DIRECTORIES.DPM_FILE} ${NAME_DIRECTORIES.IMPORT_MAPS}`,
    );
    Deno.exit();
  }
  LOGGER.error(
    'Dpm file not found! Init a dpm project with << dpm init -A >> or check the documentation with << dpm doc init >>',
  );
  Deno.exit(2);
}

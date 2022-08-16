// Copyright © 2022 Dpm Land. All Rights Reserved.

import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';
import { colors } from 'mods/deps.ts';

export async function ReadDpmFile() {
  const file = await Deno.readTextFile(BASE_DIRECTORIES.DPM_FILE).catch((e) => {
    LOGGER.error(
      `Error at reading the ${
        colors.dim(NAME_DIRECTORIES.DPM_FILE)
      }.\nCaused by:\n${colors.bold(e)}`,
    );
  });

  if (typeof file != 'string') {
    LOGGER.error(
      `Error at the type for parse the JSON file.\n${
        colors.bold('Please report this at github')
      }`,
    );
    Deno.exit(2);
  }

  return JSON.parse(file);
}

export async function ReadImportMapFile() {
  const file = await Deno.readTextFile(BASE_DIRECTORIES.IMPORT_MAPS).catch(
    (e) => {
      LOGGER.error(
        `Error at reading the ${
          colors.dim(NAME_DIRECTORIES.IMPORT_MAPS)
        }.\nCaused by:\n${colors.bold(e)}`,
      );
    },
  );

  if (typeof file != 'string') {
    LOGGER.error(
      `Error at the type for parse the JSON file.\n${
        colors.bold('Please report this at github')
      }`,
    );
    Deno.exit(2);
  }

  return JSON.parse(file);
}

export async function ReadDenoConfigFile() {
  const file = await Deno.readTextFile(BASE_DIRECTORIES.DENO_JSON_FILE).catch(
    (e) => {
      LOGGER.error(
        `Error at reading the ${
          colors.dim(NAME_DIRECTORIES.DENO_JSON_FILE)
        }.\nCaused by:\n${colors.bold(e)}`,
      );
    },
  );

  if (typeof file != 'string') {
    LOGGER.error(
      `Error at the type for parse the JSON file.\n${
        colors.bold('Please report this at github')
      }`,
    );
    Deno.exit(2);
  }

  return JSON.parse(file);
}

// Copyright © 2022 Dpm Land. All Rights Reserved.

import { ask } from 'mods/ask.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';

async function getPromptForDeno() {
  const answers = await ask.prompt([
    {
      name: 'tabs',
      message: 'Use tabs',
      type: 'confirm',
    },
    {
      name: 'indent',
      message: 'Indent width',
      type: 'number',
    },
    {
      name: 'quote',
      message: 'Single Quote',
      type: 'confirm',
    },
  ]);
  return answers;
}

export async function writeDenoConfigFile() {
  const fmt = await getPromptForDeno();
  const data = `
{
  "$schema": "https://deno.land/x/deno/cli/schemas/config-file.v1.json",
  "fmt": {
    "options": {
      "useTabs": ${fmt.tabs},
      "indentWidth": ${fmt.indent},
      "singleQuote": ${fmt.quote}
    }
  },
  "importMap": "./dpm_imports.json",
  "tasks": {}
}
  `;
  try {
    await Deno.writeTextFile(
      BASE_DIRECTORIES.DENO_JSON_FILE,
      data,
    );
  } catch (e) {
    LOGGER.error(e);
    Deno.exit(1);
  }
  LOGGER.info(`Writed successfully the ${NAME_DIRECTORIES.DENO_JSON_FILE}!`);
}

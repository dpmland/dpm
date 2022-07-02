// Copyright © 2022 Dpm Land. All Rights Reserved.

import { ask } from 'mods/ask.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { writeFileFormatted } from 'dpm/util.ts';

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

export async function writeDenoConfigFile(print?: boolean) {
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
  "tasks": {
    "test": "deno test -A --unstable",
    "fmt": "deno fmt -c deno.json",
    "lint": "deno lint -c deno.json",
  }
}
  `;
  // Magic Print
  await writeFileFormatted({
    content: data,
    path: BASE_DIRECTORIES.DENO_JSON_FILE,
    name: NAME_DIRECTORIES.DENO_JSON_FILE,
    type: 'json',
    print: print,
  });
}

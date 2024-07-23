// Copyright © 2024 Dpm Land. All Rights Reserved.

import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { basename, Confirm, Number, prompt } from 'mods/deps.ts';
import { writeFileFormatted } from 'json/utils/magicPrint.ts';
import { DenoConfigurationFileSchema } from 'json/files.types.ts';

async function getPromptForDeno() {
  return await prompt([
    {
      name: 'spaces',
      message: 'Use spaces',
      type: Confirm,
    },
    {
      name: 'indent',
      message: 'Indent width',
      type: Number,
      suggestions: [2, 4],
    },
    {
      name: 'quote',
      message: 'Single Quote',
      type: Confirm,
    },
  ]);
}

export async function writeDenoConfigFile(_print?: boolean) {
  const fmt = await getPromptForDeno();

  const data: DenoConfigurationFileSchema = {
    $schema: 'https://deno.land/x/deno@v1.35.2/cli/schemas/config-file.v1.json',
    fmt: {
      useTabs: !fmt.spaces,
      indentWidth: fmt.indent,
      singleQuote: fmt.quote,
    },
    importMap: `./${basename(BASE_DIRECTORIES.IMPORT_MAPS)}`,
    tasks: {
      test: 'deno test -A --unstable',
      fmt: 'deno fmt -c deno.json',
      [`fmt:check`]: 'deno fmt -c deno.json --check && deno lint -c deno.json',
      lint: 'deno lint -c deno.json',
      dev: 'deno run --watch main.ts',
    },
  };
  // Magic Print
  await writeFileFormatted({
    content: JSON.stringify(data, null, '  '),
    path: BASE_DIRECTORIES.DENO_JSON_FILE,
    name: NAME_DIRECTORIES.DENO_JSON_FILE,
    type: 'json',
    print: false,
  });
}

// Copyright © 2022 Dpm Land. All Rights Reserved.

import { basename, Input, prompt } from 'mods/deps.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { writeFileFormatted } from 'dpm/util.ts';

export async function GetTheOptionsPrompt() {
  return await prompt([
    {
      name: 'name',
      message: 'Package name',
      type: Input,
      suggestions: [
        `${basename(Deno.cwd())}`,
      ],
    },
    {
      name: 'version',
      message: 'Version',
      type: Input,
    },
    {
      name: 'description',
      message: 'Description of the package',
      type: Input,
    },
    {
      name: 'author',
      message: 'Author',
      type: Input,
    },
    {
      name: 'license',
      message: 'License for the app',
      type: Input,
      suggestions: [
        'FREE-ART-1.3',
        'BSD-2-CLAUSE',
        'LGPL-3.0',
        'EPL-2.0',
        'OSL-3.0',
        'ZLIB',
        'LPPL',
        'BSD-3-CLAUSE',
        'ODBL-1.0',
        'CC-BY-SA-4.0',
        'AGPL-3.0',
        'MULANPSL-2.0',
        'WTFPL',
        'CC-BY-4.0',
        'AFL-3.0',
        'BSD-0-CLAUSE',
        'LGPL-2.1',
        'EUPL-1.2',
        'MIT-0',
        'MIT',
        'APACHE-2.0',
        'UNLICENSE',
        'ISC',
        'ECL-2.0',
        'CC0-1.0',
        'MS-PL',
        'BSD-4-CLAUSE',
        'MPL-2.0',
        'GPL-2.0',
        'OFL-1.1',
        'AL-2.0',
        'GPL-3.0',
        'MS-RL',
      ],
    },
    {
      name: 'entry_point',
      message: 'Entry Point or main file',
      type: Input,
      suggestions: ['mod.ts', 'main.ts'],
    },
  ]);
}

function generateJSONObject(
  input: Record<string, unknown>,
): Record<string, unknown> {
  return {
    $schema: `https://dpmland.deno.dev/schema`,
    name: input.name || basename(Deno.cwd()),
    version: input.version || '0.1.0',
    description: input.description || 'A example dpm package',
    author: input.author || 'A cool coder human',
    license: input.license || 'ISC',
    main: input.entry_point || 'mod.ts',
    scripts: {
      test: 'deno test -A --unstable',
      fmt: 'deno fmt -c deno.json',
      lint: 'deno lint -c deno.json',
    },
    dependencies: {},
  };
}

export async function WriteDpmFileJson(
  input_prompt: Record<string, unknown>,
  print?: boolean,
) {
  // Magic Print
  await writeFileFormatted({
    content: JSON.stringify(generateJSONObject(input_prompt), null, ' '),
    path: BASE_DIRECTORIES.DPM_FILE,
    name: NAME_DIRECTORIES.DPM_FILE,
    type: 'json',
    print: print,
  });
}

export async function WriteImportMapJson(print?: boolean) {
  // Magic Print
  await writeFileFormatted({
    content: JSON.stringify(
      {
        imports: {},
      },
      null,
      '  ',
    ),
    path: BASE_DIRECTORIES.IMPORT_MAPS,
    name: NAME_DIRECTORIES.IMPORT_MAPS,
    type: 'json',
    print: print,
  });
}

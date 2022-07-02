// Copyright © 2022 Dpm Land. All Rights Reserved.

import { ask } from 'mods/ask.ts';
import { basename, dracoFiles } from 'mods/deps.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { writeFileFormatted } from 'dpm/util.ts';

export async function GetTheOptionsPrompt() {
  const answers = await ask.prompt([
    {
      name: 'name',
      message: 'Package name',
      type: 'input',
    },
    {
      name: 'version',
      message: 'Version',
      type: 'input',
    },
    {
      name: 'description',
      message: 'Description of the package',
      type: 'input',
    },
    {
      name: 'author',
      message: 'Author',
    },
    {
      name: 'license',
      message: 'License for the app',
    },
    {
      name: 'entry_point',
      message: 'Entry Point or main file',
      type: 'input',
    },
  ]);
  return answers;
}

function generateJSONObject(
  input: Record<string, unknown>,
): Record<string, unknown> {
  return {
    $schema:
      'https://raw.githubusercontent.com/dpmland/dpm/dev/schemas/dpm.json',
    name: input.name || basename(dracoFiles.currentDir()),
    version: input.version || '0.1.0',
    description: input.description || 'A example dpm package',
    author: input.author || 'A cool coder human',
    license: input.license || 'ISC',
    main: input.entry_point || 'mod.ts',
    scripts: {
      build_in: {
        test: 'deno test -A --unstable',
        fmt: 'deno fmt -c deno.json',
        lint: 'deno lint -c deno.json',
      },
    },
    dependencies: {},
  };
}

export async function WriteDpmFileJson(
  input_prompt: Record<string, unknown>,
  print?: boolean,
) {
  // Content
  const file = JSON.stringify(generateJSONObject(input_prompt), null, ' ');

  // Magic Print
  await writeFileFormatted({
    content: file,
    path: BASE_DIRECTORIES.DPM_FILE,
    name: NAME_DIRECTORIES.DPM_FILE,
    type: 'json',
    print: print,
  });
}

export async function WriteImportMapJson(print?: boolean) {
  const file = JSON.stringify(
    {
      imports: {},
    },
    null,
    '  ',
  );

  // Magic Print
  await writeFileFormatted({
    content: file,
    path: BASE_DIRECTORIES.IMPORT_MAPS,
    name: NAME_DIRECTORIES.IMPORT_MAPS,
    type: 'json',
    print: print,
  });
}

// Copyright © 2024 Dpm Land. All Rights Reserved.
import { readDpmFile } from 'json/reader.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { writeFileFormatted } from 'json/utils/magicPrint.ts';
import { EggsConfigInterface } from 'json/files.types.ts';

export async function writeEggFile(print?: boolean) {
  const data = await readDpmFile();

  const file: EggsConfigInterface = {
    $schema: 'https://x.nest.land/eggs@0.3.10/src/schema.json',
    name: data.name,
    entry: data.main,
    description: data.description,
    homepage: `https://github.com/the_name/${data.name}`,
    unstable: true,
    unlisted: false,
    releaseType: 'patch',
    files: [
      './mod.ts',
      './src/**/*',
      './README.md',
    ],
    ignore: ['.git'],
    checkFormat: 'deno task fmt:check',
    checkInstallation: true,
  };

  // Magic Print
  await writeFileFormatted({
    content: JSON.stringify(file, null, '  '),
    path: BASE_DIRECTORIES.EGGS_FILE,
    name: NAME_DIRECTORIES.EGGS_FILE,
    type: 'json',
    print: print,
  });
}

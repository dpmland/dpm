import { ReadDpmFile } from 'dpm/read.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { writeFileFormatted } from 'dpm/util.ts';

export async function generateEggsFile(print?: boolean) {
  const data = await ReadDpmFile();

  const file = {
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
    checkInstallation: 'deno test',
    check: false,
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

// Copyright © 2024 Dpm Land. All Rights Reserved.

import { readImportMapFile } from 'json/reader.ts';
import { colors, Confirm, Input } from 'mods/deps.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';

// Try find register
async function findRegisters(url: string, name: string): Promise<string[]> {
  const registers = [
    'deno.land/x/',
    'deno.land/std',
    'raw.githubusercontent.com',
    'denopkg.com',
    'nest.land',
    'esm.sh',
  ];

  const answer: string[] = [];

  for await (const i of registers) {
    if (url.includes(i)) {
      answer.push(
        `// REGISTER: ${i.toUpperCase().split('/')[0]} -> URL: ${url}\n`,
      );
      const file: string = await Input.prompt(
        `What file do you want use from ${
          colors.bold(name.replaceAll(/[^A-Za-z0-9]/g, ''))
        }?`,
      );

      switch (file.split('.').slice(1)[0]) {
        case 'js':
          break;
        case 'ts':
          break;
        default:
          LOGGER.warn('Not found .js or .ts extension!!');
          break;
      }

      answer.push(
        `export * as ${
          name.replaceAll(/[^A-Za-z0-9]/g, '')
        } from "${url}${file}";\n`,
      );
    }
  }

  return answer;
}

export function printTypescript(txt: string) {
  1;
  const LINES = txt.split('\n');
  let colorized = '';
  for (const i of LINES) {
    if (i.startsWith('//')) {
      colorized += `${colors.dim(i)}\n`;
    } else {
      let text = '';
      i.split(' ').forEach((i) => {
        if (i == 'export') {
          text += colors.brightMagenta(i) + ' ';
        } else if (i == 'as') {
          text += colors.blue(i) + ' ';
        } else if (i == 'from') {
          text += colors.cyan(i) + ' ';
        } else if (i == '*') {
          text += colors.brightBlue(i) + ' ';
        } else if (i.startsWith(`"`)) {
          text += `${colors.yellow(i).replace(';', '')}${colors.green(';')}`;
        } else {
          text += i + ' ';
        }
      });
      colorized += `${text}\n`;
    }
  }
  console.log(colorized);
}

export async function generateTypescriptDep() {
  const imports = await readImportMapFile();
  let txt = `// Generated with DPM Please no modify!\n\n`;
  for await (const i of Object.keys(imports.imports)) {
    const r = await findRegisters(imports.imports[i], i);
    r.forEach((i) => {
      txt += i;
    });
  }

  printTypescript(txt);
  const write: boolean = await Confirm.prompt('Do you want write this file?');

  if (write) {
    try {
      const path: string = await Input.prompt({
        message: 'Path to write the file?',
        suggestions: [
          BASE_DIRECTORIES.DEPS_BUNDLE,
          './deps.ts',
        ],
      });

      await Deno.writeTextFile(path, txt);
    } catch (error) {
      LOGGER.error(
        `Cannot Write successfully the file ${NAME_DIRECTORIES.DEPS_BUNDLE.toUpperCase()}\nCaused by: ${
          colors.red(error)
        }`,
      );
      Deno.exit(2);
    }
  }

  LOGGER.done(
    `Successfully written the file ${NAME_DIRECTORIES.DEPS_BUNDLE.toUpperCase()}`,
  );
}

// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command, dracoInfo, Table } from 'mods/deps.ts';
import { GetAuthors } from 'mods/authors.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';
import { VERSION } from 'mods/info.ts';
import { ReadDpmFile } from 'dpm/read.ts';
import { ListAllLicenses } from 'core/license/download.ts';

export const AboutCommand = new Command()
  .alias('me')
  .description(
    `Do you known some information or commands of dpm can you check more here! 📕`,
  )
  .example(
    'Help',
    'You can check all commands available with << dpm about help >>',
  )
  .arguments('<action:string>')
  .stopEarly()
  .action(async (_, action: string) => {
    switch (action.toLowerCase()) {
      case 'deno': {
        const DENO_INFO = {
          deno: dracoInfo.DenoVersion,
          v8: dracoInfo.DenoV8,
          typescript: dracoInfo.DenoTypescript,
        };
        const DPM_INFO = {
          version: VERSION,
          license: 'GPL-3.0',
          source: 'https://github.com/dpmland/dpm',
          issue: 'https://github.com/dpmland/dpm/issues',
        };

        const table: Table = Table.from([]);

        for (const i of Object.entries(DENO_INFO)) {
          table.push(i);
        }
        for (const it of Object.entries(DPM_INFO)) {
          table.push(it);
        }
        table.header(['App', 'Information']);
        table.sort();
        table.border(true);
        table.render();
        break;
      }

      case 'dirs': {
        const DIRECTORIES_SHOW = {
          logs: BASE_DIRECTORIES.LOGS,
          config: BASE_DIRECTORIES.CONFIG,
          docs: BASE_DIRECTORIES.DOCS,
          license: BASE_DIRECTORIES.LICENSE_DIR,
          temp: BASE_DIRECTORIES.TEMP,
          dpm: BASE_DIRECTORIES.DPM_FILE,
          deno: BASE_DIRECTORIES.DENO_JSON_FILE,
          importMapFile: BASE_DIRECTORIES.IMPORT_MAPS,
          eggs: BASE_DIRECTORIES.EGGS_FILE,
          readme: BASE_DIRECTORIES.README,
        };
        const table: Table = Table.from([]);

        for (const i of Object.entries(DIRECTORIES_SHOW)) {
          table.push(i);
        }
        table.header(['Dir Alias', 'Route']);
        table.sort();
        table.border(true);
        table.render();
        break;
      }

      case 'dpm': {
        console.log('Dpm File content');
        const data = await ReadDpmFile();
        console.log(data);
        break;
      }

      case 'authors': {
        GetAuthors();
        break;
      }

      case 'deps': {
        const data = await ReadDpmFile();
        console.log(data.dependencies);
        break;
      }

      case 'licenses': {
        await ListAllLicenses();
        break;
      }

      case 'help': {
        const COMMANDS_AVALIABLES = {
          deno:
            `Here you can get the Deno Information and the DPM License, Issue and other important information`,
          dirs:
            `Here you can find the DPM directories that are used for its operation.`,
          dpm: `Here you can find the content of the DPM file!`,
          authors: `Here you can get the authors of DPM and his credits!`,
          deps: `Here you can get the dependencies avaliable on the DPM File!`,
          license: `Here you can get all licenses avaliable for the DPM file!`,
          help: `This command. You can get all avaliable commands!`,
        };
        const table: Table = Table.from([]);

        for (const i of Object.entries(COMMANDS_AVALIABLES)) {
          table.push(i);
        }
        table.header(['Action', 'Description']);
        table.sort();
        table.border(true);
        table.render();
        break;
      }

      default: {
        LOGGER.error(
          'Type for about not found check the documentation or run dpm doc about',
        );
        break;
      }
    }
  });

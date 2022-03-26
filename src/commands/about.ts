// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command, dracoInfo, emoji, table } from 'mods/deps.ts';
import { GetAuthors } from 'mods/authors.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';
import { VERSION } from 'mods/info.ts';
import { ReadDpmFile } from 'dpm/read.ts';

export class AboutCommand extends Command {
  #cmd?: Command;

  public constructor(cmd?: Command) {
    super();
    this.#cmd = cmd;
    return this.alias('me')
      .description(
        `Do you known some information or commands of dpm can you check more here! ${
          emoji.get('closed_book')
        }`,
      )
      .arguments('[action:string]')
      .stopEarly()
      .action(async (_, action: string) => {
        switch (action) {
          case 'deno': {
            const DENO_INFO = [
              {
                name: 'VERSION',
                version: dracoInfo.DenoVersion,
              },
              {
                name: 'TYPESCRIPT',
                version: dracoInfo.DenoTypescript,
              },
              {
                name: 'V8',
                version: dracoInfo.DenoV8,
              },
            ];
            const DPM_INFO = [
              {
                name: 'VERSION',
                data: VERSION,
              },
              {
                name: 'LICENSE',
                data: 'GPL-3.0',
              },
              {
                name: 'CODE SOURCE',
                data: 'https://github.com/dpmland/dpm',
              },
              {
                name: 'ISSUE REPORT',
                data: 'https://github.com/dpmland/dpm/issues',
              },
            ];
            const tDeno = table(DENO_INFO, ['tool', 'version'], {
              upcaseHeader: true,
              emptyReplacer: 'No field Provided',
              padding: 4,
            });
            const tDpm = table(DPM_INFO, ['key', 'data'], {
              upcaseHeader: true,
              emptyReplacer: 'No field Provided',
              padding: 4,
            });
            console.info('Deno Information build!');
            console.log(tDeno);
            console.info('Dpm Information build!');
            console.log(tDpm);
            break;
          }

          case 'dirs': {
            const DIRECTORIES_SHOW = [
              {
                name: 'CACHE AND LOGS',
                dir: BASE_DIRECTORIES.LOGS,
              },
              {
                name: 'CONFIG',
                dir: BASE_DIRECTORIES.CONFIG,
              },
              {
                name: 'DOCS',
                dir: BASE_DIRECTORIES.DOCS,
              },
              {
                name: 'IMPORT MAP WITH DIR',
                dir: BASE_DIRECTORIES.IMPORT_MAPS_DIR,
              },
            ];
            const FILE_SHOW = [
              {
                name: 'DPM FILE',
                dir: BASE_DIRECTORIES.DPM_FILE,
              },
              {
                name: 'DENO CONFIG FILE',
                dir: BASE_DIRECTORIES.DENO_JSON_FILE,
              },
              {
                name: 'IMPORT MAP FILE',
                dir: BASE_DIRECTORIES.IMPORT_MAPS,
              },
              {
                name: 'EGGS FILE',
                dir: BASE_DIRECTORIES.EGGS_FILE,
              },
              {
                name: 'README FILE',
                dir: BASE_DIRECTORIES.README,
              },
            ];
            const tDir = table(DIRECTORIES_SHOW, ['name', 'route'], {
              upcaseHeader: true,
              emptyReplacer: 'No field provided',
              padding: 4,
            });
            const tFile = table(FILE_SHOW, ['name', 'route'], {
              upcaseHeader: true,
              emptyReplacer: 'No field provided',
              padding: 4,
            });
            console.info('Directories table of routes');
            console.log(tDir);
            console.info('File table of routes');
            console.log(tFile);
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

          default: {
            LOGGER.error(
              'Type for about not found check the documentation or run dpm doc about',
            );
            break;
          }
        }
      });
  }
}

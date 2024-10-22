// Copyright © 2024 Dpm Land. All Rights Reserved.

import { Command, Table } from 'mods/deps.ts';
import { LOGGER } from 'mods/logger.ts';
import { generateTypescriptDep } from 'bundler/generate_ts/main.ts';
import { minifyFiles } from 'bundler/minify/cmd/main.ts';
import { generateInstaller } from 'bundler/monk/main.ts';

export const BundlerCommand = new Command()
  .description(
    `Do you want simplfy files or generate files? Generate with this 🤟`,
  )
  .arguments('[action:string]')
  .action(async (_, action) => {
    switch (action) {
      case 'minify': {
        await minifyFiles();
        break;
      }
      case 'mini': {
        await minifyFiles();
        break;
      }

      case 'installer': {
        await generateInstaller();
        break;
      }

      case 'monk': {
        await generateInstaller();
        break;
      }

      case 'typescript': {
        await generateTypescriptDep();
        break;
      }

      case 'ts': {
        await generateTypescriptDep();
        break;
      }

      case 'help': {
        const AVAILABLE_COMMANDS = {
          minify:
            `With this command you can minify the files with this extensions! HTML CSS JS JSON -> *ALIAS: mini*`,
          installer:
            `With this command you can generate a installer file with the information on the dpm.json file! -> *ALIAS: monk*`,
          typescript:
            `With this command you can generate a dependencies file in typescript! -> *ALIAS: ts*`,
        };
        const table: Table = Table.from([]);

        for (const i of Object.entries(AVAILABLE_COMMANDS)) {
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
          'Action for about not found check the documentation or run dpm bundle help',
        );
        break;
      }
    }
  });

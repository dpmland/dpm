// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command, emoji, Table } from 'mods/deps.ts';
import { writeDenoConfigFile } from 'dpm/deno.ts';
import { generateReadme } from 'dpm/readme.ts';
import { generateEggsFile } from 'dpm/eggs.ts';
import {
  GetTheOptionsPrompt,
  WriteDpmFileJson,
  WriteImportMapJson,
} from 'dpm/init.ts';
import { FormatInternalJSON } from 'runner/format.ts';
import { LOGGER } from 'mods/logger.ts';

export class InitCommand extends Command {
  #cmd?: Command;

  public constructor(cmd?: Command) {
    super();
    this.#cmd = cmd;
    return this.description(
      `Start and create the files necessary for a better development with DPM! ${
        emoji.get('lion')
      }`,
    )
      // Aliases and options!
      .alias('create')
      .option('-A, --all [all:boolean]', 'Write all necessary files!')
      .option(
        '-y, --yes [yes:boolean]',
        'Write only the dpm file and the imports not more! The necessary files!',
      )
      .option('-f, --file [file:string]', 'Only the file to create!')
      .stopEarly()
      .example(
        'Help',
        `For check the help you can go to the << dpm doc init >> or the https://dpmland-docs.netlify.app/commands/init/ url!`,
      )
      // Manage the actions!
      .action(async (options) => {
        if (options.all == true) {
          const app = await GetTheOptionsPrompt();
          await WriteDpmFileJson(app);
          await WriteImportMapJson();
          await writeDenoConfigFile();
          await generateReadme();
          await generateEggsFile();
          await FormatInternalJSON();
          Deno.exit();
        }
        if (options.yes == true) {
          await WriteDpmFileJson({});
          await WriteImportMapJson();
          Deno.exit();
        }

        if (typeof options.file == 'string') {
          switch (options.file.toLowerCase()) {
            case 'readme': {
              await generateReadme();
              break;
            }

            case 'eggs': {
              await generateEggsFile();
              break;
            }

            case 'deno': {
              await writeDenoConfigFile();
              break;
            }

            case 'dpmImports': {
              await WriteImportMapJson();
              break;
            }

            case 'dpm': {
              await WriteDpmFileJson({});
              break;
            }

            case 'help': {
              const COMMANDS_AVALIABLES = {
                readme:
                  `Generate only the README file! Note: << Necessary the dpm.json file! >>`,
                eggs:
                  `Generate only the eggs file! Note: << Necessary the dpm.json file! >>`,
                deno: `Generate the deno.json file with the default configs!`,
                importMap:
                  `Generate the dpm_imports.json with a empty content!`,
                dpm: `Generate the dpm.json file with the default content!`,
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
              LOGGER.warn(
                'Action not found check the << dpm doc init.actions >> for the option correct!',
              );
              break;
            }
          }
        }
        const app = await GetTheOptionsPrompt();
        await WriteDpmFileJson(app);
        await WriteImportMapJson();
      });
  }
}

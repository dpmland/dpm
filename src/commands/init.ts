// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command, emoji } from 'mods/deps.ts';
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
          switch (options.file) {
            case 'readme': {
              await generateReadme();
              break;
            }

            case 'eggs': {
              await generateEggsFile();
              break;
            }

            case 'deno-config': {
              await writeDenoConfigFile();
              break;
            }

            case 'import-map': {
              await WriteImportMapJson();
              break;
            }

            case 'dpm': {
              await WriteDpmFileJson({});
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

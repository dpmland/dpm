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
import { DownloadTemplate, GetLicense } from 'core/license/download.ts';
import { EditorJSONConfig } from 'dpm/editor_gen.ts';

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
      .option(
        '-M --minimalist [minimalist:boolean]',
        'Write all files but without print the content!',
      )
      .option(
        '-D --download-license [downloadLicense:boolean]',
        'Download the license file from the dpm.json file!',
      )
      .stopEarly()
      // Manage the actions!
      .action(async (options) => {
        if (options.minimalist == true) {
          const app = await GetTheOptionsPrompt();
          await WriteDpmFileJson(app);
          await WriteImportMapJson();
          await writeDenoConfigFile();
          await generateReadme();
          await generateEggsFile();
          await GetLicense();
          await FormatInternalJSON();
          Deno.exit();
        }

        if (options.all == true) {
          const app = await GetTheOptionsPrompt();
          await WriteDpmFileJson(app, true);
          await WriteImportMapJson(true);
          await writeDenoConfigFile(true);
          await generateReadme(true);
          await generateEggsFile(true);
          await GetLicense();
          await FormatInternalJSON();
          Deno.exit();
        }

        if (options.yes == true) {
          await WriteDpmFileJson({});
          await WriteImportMapJson();
          Deno.exit();
        }

        if (options.downloadLicense == true) {
          await DownloadTemplate();
          Deno.exit();
        }

        if (typeof options.file == 'string') {
          switch (options.file.toLowerCase()) {
            case 'readme': {
              await generateReadme();
              Deno.exit();
              break;
            }

            case 'eggs': {
              await generateEggsFile();
              Deno.exit();
              break;
            }

            case 'deno': {
              await writeDenoConfigFile();
              Deno.exit();
              break;
            }

            case 'dpmImports': {
              await WriteImportMapJson();
              Deno.exit();
              break;
            }

            case 'dpm': {
              await WriteDpmFileJson({});
              Deno.exit();
              break;
            }

            case 'license': {
              await GetLicense();
              Deno.exit();
              break;
            }

            case 'editor': {
              await EditorJSONConfig();
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
                license:
                  `Generate the LICENSE from the template using the LICENSE in the dpm.json file! Note<< Necessary the dpm.json file! >>`,
              };

              const table: Table = Table.from([]);

              for (const i of Object.entries(COMMANDS_AVALIABLES)) {
                table.push(i);
              }
              table.header(['Action', 'Description']);
              table.sort();
              table.border(true);
              table.render();
              Deno.exit();
              break;
            }

            default: {
              LOGGER.warn(
                'Action not found check the << dpm init help >> for the option correct!',
              );
              Deno.exit();
            }
          }
        }
        const app = await GetTheOptionsPrompt();
        await WriteDpmFileJson(app);
        await WriteImportMapJson();
      });
  }
}

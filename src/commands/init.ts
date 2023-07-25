// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command, jsonColorize, Table } from 'mods/deps.ts';
import {
  getTheOptionsPrompt,
  JSON_LSP,
  writeDenoConfigFile,
  writeDpmFile,
  writeEditorJSONConfig,
  writeEggFile,
  writeImportMapFile,
  writeReadmeFile,
} from 'json/writer.ts';
import { FormatInternalJSON } from 'runner/format.ts';
import { LOGGER } from 'mods/logger.ts';
import { DownloadTemplate, GetLicense } from 'core/license/download.ts';

export const InitCommand = new Command()
  .description(
    `Start and create the files necessary for a better development with DPM! 📦.`,
  )
  .alias('create')
  .option('-A, --all [all:boolean]', 'Write all necessary files!')
  .option(
    '-y, --yes [yes:boolean]',
    'Write only the dpm file and the imports not more! The necessary files!',
  )
  .option('-f, --file <file:string>', 'Only the file to create!')
  .option(
    '-M --minimalist [minimalist:boolean]',
    'Write all files but without print the content!',
  )
  .option(
    '-D --download-license [downloadLicense:boolean]',
    'Download the license file from the dpm.json file!',
  )
  // Manage the actions!
  .action(async ({ all, yes, file, minimalist, downloadLicense }) => {
    if (minimalist == true) {
      const app = await getTheOptionsPrompt();
      await writeDpmFile(app);
      await writeImportMapFile();
      await writeDenoConfigFile();
      await writeReadmeFile();
      await writeEggFile();
      await GetLicense();
      Deno.exit();
    }

    if (all == true) {
      const app = await getTheOptionsPrompt();
      await writeDpmFile(app, true);
      await writeImportMapFile(true);
      await writeDenoConfigFile(true);
      await writeReadmeFile(true);
      await writeEggFile(true);
      await GetLicense();
      await writeEditorJSONConfig();
      await FormatInternalJSON();
      Deno.exit();
    }

    if (yes == true) {
      await writeDpmFile({});
      await writeImportMapFile();
      await writeDenoConfigFile();
      Deno.exit();
    }

    if (downloadLicense == true) {
      await DownloadTemplate();
      Deno.exit();
    }

    if (typeof file == 'string') {
      switch (file.toLowerCase()) {
        case 'readme': {
          await writeReadmeFile();
          Deno.exit();
          break;
        }

        case 'eggs': {
          await writeEggFile();
          Deno.exit();
          break;
        }

        case 'deno': {
          await writeDenoConfigFile();
          Deno.exit();
          break;
        }

        case 'dpmImports': {
          await writeImportMapFile();
          Deno.exit();
          break;
        }

        case 'dpm': {
          await writeDpmFile({});
          Deno.exit();
          break;
        }

        case 'license': {
          await GetLicense();
          Deno.exit();
          break;
        }

        case 'editor': {
          await writeEditorJSONConfig();
          Deno.exit();
          break;
        }

        case 'editor-cfg': {
          jsonColorize.colorize(JSON.stringify(JSON_LSP), {
            pretty: true,
          });
          Deno.exit();
          break;
        }

        case 'help': {
          const AVAILABLE_COMMANDS = {
            readme:
              `Generate only the README file! Note: << Necessary the dpm.json file! >>`,
            eggs:
              `Generate only the eggs file! Note: << Necessary the dpm.json file! >>`,
            deno: `Generate the deno.json file with the default configs!`,
            importMap: `Generate the import_map.json with a empty content!`,
            dpm: `Generate the dpm.json file with the default content!`,
            license:
              `Generate the LICENSE from the template using the LICENSE in the dpm.json file! Note: << Necessary the dpm.json file! >>`,
            editor:
              `Generate a config file for an editor de default config for the dpm files! Note: << If you want know the editor supported run ** dpm docs init.files ** >>`,
          };

          const table: Table = Table.from([]);

          for (const i of Object.entries(AVAILABLE_COMMANDS)) {
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
    const app = await getTheOptionsPrompt();
    await writeDpmFile(app);
    await writeImportMapFile();
  });

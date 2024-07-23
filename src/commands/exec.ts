// Copyright © 2024 Dpm Land. All Rights Reserved.
import {
  basename,
  colors,
  Command,
  directory,
  dracoInfo,
  join,
  Table,
  UtilUnknown,
} from 'mods/deps.ts';
import {
  denoPermissionFlags,
  GeneratePromptDPX,
  RunDPX,
  supportedModuleExts,
} from 'dpx/main.ts';
import { LOGGER } from 'mods/logger.ts';

export const ExecCommand = new Command()
  .description(
    `With this tool you can run Deno X modules without installation 👀.

      Extracted from Land: ${colors.bold('https://github.com/ije/land')}
      Thanks to Ije for make this amazing tool 😎.`,
  )
  .alias('x')
  .arguments('[cmd:...string]')
  .option(
    '-d --defaults [defaults:boolean]',
    'Show a table with the default values used in the DPX CLI!',
  )
  .option(
    '-a --alias [alias:boolean]',
    'Setup the alias to the app in the profile!',
  )
  .example(
    'Help',
    `For run this tool you can use: ${
      colors.bold(
        'dpm exec',
      )
    } or can use: ${colors.bold('dpx')} for example`,
  )
  .action(async ({ alias, defaults }, cmd) => {
    if (alias == true) {
      if (dracoInfo.platform() == 'windows') {
        LOGGER.info(`Unsupported platform working in this...`);
        Deno.exit();
      }
      if (dracoInfo.platform() == 'linux' || dracoInfo.platform() == 'darwin') {
        const stringToAdd = `alias dpx="dpm exec"`;
        console.log(
          `Append this command\n${colors.bold(colors.cyan(stringToAdd))}\n`,
        );
        switch (basename(Deno.env.get('SHELL')!)) {
          case 'zsh': {
            console.log(
              `To the path of your shell in this case ${
                basename(
                  Deno.env.get('SHELL')!,
                )
              }:\n${colors.bold(join(directory.default('home')!, '.zshrc'))}\n`,
            );
            break;
          }

          case 'fish': {
            console.log(
              `To the path of your shell in this case ${
                basename(
                  Deno.env.get('SHELL')!,
                )
              }:\n${
                colors.bold(
                  join(
                    directory.default('home')!,
                    '.config',
                    'fish',
                    'config.fish',
                  ),
                )
              }\n`,
            );
            break;
          }

          case 'bash': {
            console.log(
              `To the path of your shell in this case ${
                basename(
                  Deno.env.get('SHELL')!,
                )
              }:\n${
                colors.bold(join(directory.default('home')!, '.bashrc'))
              }\n`,
            );
            break;
          }

          default: {
            LOGGER.error('This shell is unsupported!');
            break;
          }
        }
      }
      Deno.exit();
    }

    if (defaults == true) {
      const DEFAULTS_CLI = {
        importMap:
          `The defaults name are: 'import_map.json', 'import-map.json', 'importMap.json', 'importmap.json'!`,
        filenames: `The default names are: 'cli', 'main', 'mod'`,
        extensions: `The default extensions are: ${
          supportedModuleExts.join(
            ' ',
          )
        }`,
        denoFlags: `The default deno flags supported are: ${
          denoPermissionFlags.join(
            ' ',
          )
        }`,
      };

      const table: Table = Table.from([]);

      for (const i of Object.entries(DEFAULTS_CLI)) {
        table.push(i);
      }
      table.header(['Action', 'Description']);
      table.sort();
      table.border(true);
      table.render();
      Deno.exit();
    }

    let answers, filename, importMap, app;
    if (cmd == null) {
      answers = await GeneratePromptDPX();
      filename = answers.name?.toString().split(' ');
      importMap = answers.importMap?.toString().split(' ');
      app = answers.app?.toString().split(' ');
    } else {
      // BUG: Flags not work with many args
      filename = undefined;
      importMap = undefined;
      app = typeof cmd != 'undefined' || cmd != null ? cmd : app;
    }
    if (UtilUnknown.isArray(app, UtilUnknown.isString)) {
      await RunDPX(app, {
        filenameNames: filename,
        importMapNames: importMap,
      });
    }
  });

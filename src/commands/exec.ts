// Copyright © 2022 Dpm Land. All Rights Reserved.
import {
  basename,
  colors,
  Command,
  dracoFiles,
  dracoInfo,
  emoji,
  join,
  node,
  Table,
} from 'mods/deps.ts';
import {
  denoPermissionFlags,
  GeneratePromptDPX,
  RunDPX,
  supportedModuleExts,
} from 'dpx/main.ts';
import { LOGGER } from 'mods/logger.ts';

export class ExecCommand extends Command {
  #cmd?: Command;
  public constructor(cmd?: Command) {
    super();
    this.#cmd = cmd;

    return this.description(
      `With this tool you can run Deno X modules without installation. ${
        emoji.get('sauropod')
      }

      Extracted from Land: https://github.com/ije/land
      Thanks to Ije for make this amazing tool ${emoji.get('sunglasses')}`,
    )
      .alias('x')
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
          colors.bold('dpm exec')
        } or can use: ${colors.bold('dpx')} for example`,
      )
      .stopEarly()
      .action(async (options) => {
        if (options.alias == true) {
          console.info('Working in this feature');
          if (
            dracoInfo.platform() == 'linux' || dracoInfo.platform() == 'darwin'
          ) {
            const stringToAdd = `alias dpx="dpm exec"`;
            console.log(
              `Append this command\n${colors.bold(colors.cyan(stringToAdd))}`,
            );
            switch (basename(node.env.SHELL)) {
              case 'zsh': {
                console.log(
                  `To the path of your shell in this case ${
                    basename(node.env.SHELL)
                  }:\n${colors.bold(join(dracoFiles.homeDir()!, '.zshrc'))}`,
                );
                break;
              }

              case 'fish': {
                console.log(
                  `To the path of your shell in this case ${
                    basename(node.env.SHELL)
                  }:\n${
                    colors.bold(
                      join(
                        dracoFiles.homeDir()!,
                        '.config',
                        'fish',
                        'config.fish',
                      ),
                    )
                  }`,
                );
                break;
              }

              case 'bash': {
                console.log(
                  `To the path of your shell in this case ${
                    basename(node.env.SHELL)
                  }:\n${colors.bold(join(dracoFiles.homeDir()!, '.bashrc'))}`,
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
        const answers = await GeneratePromptDPX();
        const filename = answers.name?.toString().split(' ');
        const importMap = answers.importMap?.toString().split(' ');
        const app = answers.app?.toString().split(' ');

        await RunDPX(app, {
          filenameNames: filename,
          importMapNames: importMap,
        });

        if (options.defaults == true) {
          const DEFAULTS_CLI = {
            importMap:
              `The defaults name are: 'import_map.json', 'import-map.json', 'importMap.json', 'importmap.json'!`,
            filenames: `The default names are: 'cli', 'main', 'mod'`,
            extensions: `The default extensions are: ${
              supportedModuleExts.join(' ')
            }`,
            denoFlags: `The default deno flags supported are: ${
              denoPermissionFlags.join(' ')
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
      });
  }
}

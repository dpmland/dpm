// Copyright © 2022 Dpm Land. All Rights Reserved.
import { Command, emoji } from 'mods/deps.ts';
import { dracoFiles } from 'mods/deps.ts';
import { LOGGER } from 'mods/logger.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import {
  esmInstallation,
  installDepsToImports,
  installStdToImports,
} from 'packages/main.ts';
import { WriteDpmFileJson } from 'dpm/init.ts';

export class InstallCommand extends Command {
  #cmd?: Command;
  public constructor(cmd?: Command) {
    super();
    this.#cmd = cmd;

    return this.description(
      `If you want use external packages and dependencies can you use this tool! ${
        emoji.get('package')
      }`,
    )
      .alias('add')
      .arguments('[dependency...:string]')
      .option('--host [host:boolean]', 'Change from deno.land/x to other')
      .option(
        '-s, --std [std...:string]',
        'Add a dependency from the std library',
      )
      .option(
        '-e --esm [esm...:string]',
        'Add a dependency from the https://esm.sh register',
      )
      .example(
        'Help',
        `For check the help you can go to the << dpm doc install >> or the https://dpmland-docs.netlify.app/commands/install/ url!`,
      )
      .stopEarly()
      .action(async (options, dependency: string[]) => {
        if (typeof dependency == 'string') {
          LOGGER.info(`Dependency to install: ${dependency}`);
        } else if (typeof dependency != 'undefined') {
          LOGGER.info(`Dependencies to install: ${dependency.join(' ,')}`);
        }
        if (dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE) == false) {
          await WriteDpmFileJson({});
          LOGGER.warn('Writing the default dpm file because not exists!');
        }
        if (options.std != undefined) {
          await installStdToImports(options.std);
          Deno.exit();
        }
        if (options.esm != undefined) {
          await esmInstallation(options.esm);
          Deno.exit();
        }
        await installDepsToImports(dependency, { host: options.host });
      });
  }
}

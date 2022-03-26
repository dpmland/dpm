// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command, emoji } from 'mods/deps.ts';
import { dracoFiles } from 'mods/deps.ts';
import { LOGGER } from 'mods/logger.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import { installDepsToImports, installStdToImports } from 'packages/main.ts';
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
        '-s, --std [std:boolean]',
        'Add a dependency from the std library',
      )
      .stopEarly()
      .action(async (options, dependency: string[]) => {
        if (dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE) == false) {
          await WriteDpmFileJson({});
          LOGGER.warn('Writing the default dpm file because not exists!');
        }
        if (options.std) {
          await installStdToImports(dependency);
          Deno.exit();
        }
        await installDepsToImports(dependency, { host: options.host });
      });
  }
}

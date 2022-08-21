// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command, emoji } from 'mods/deps.ts';
import * as uninstall from 'packages/clean.ts';

export class UninstallCommand extends Command {
  #cmd?: Command;

  public constructor(cmd?: Command) {
    super();
    this.#cmd = cmd;

    return this.description(
      `Uninstall dependencies from the dpm file and the import file! ${
        emoji('mag')
      }`,
    )
      .alias('remove')
      .arguments('[dependency...:string]')
      .option(
        '-A, --all [all:boolean]',
        'Remove all dependencies from the files!',
      )
      .stopEarly()
      .action(async (options, dependency: string[]) => {
        if (typeof options.all == 'boolean') {
          if (options.all == true) {
            await uninstall.cleanAllDeps();
            Deno.exit();
          }
        }
        await uninstall.cleanAnyDependency(dependency);
      });
  }
}

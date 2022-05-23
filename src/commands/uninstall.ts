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
        emoji.get('broom')
      }`,
    )
      .alias('clean')
      .arguments('[dependency...:string]')
      .option(
        '-A, --all [all:boolean]',
        'Remove all dependencies from the files!',
      )
      .example(
        'Help',
        `For check the help you can go to the << dpm doc uninstall >> or the https://dpmland-docs.netlify.app/commands/uninstall/ url!`,
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

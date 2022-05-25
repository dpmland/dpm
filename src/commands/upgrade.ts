// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command, emoji, Table } from 'mods/deps.ts';
import { Run } from 'runner/main.ts';
// import { LOGGER } from 'mods/logger.ts';

export class UpgradeCommand extends Command {
  #cmd?: Command;

  public constructor(cmd?: Command) {
    super();
    this.#cmd = cmd;

    return this.description(
      `Upgrade the dpm executable to the canary and the stable version! ${
        emoji.get('guardsman')
      }`,
    )
      .arguments('[version:string]')
      .example(
        'Versions Avaliable?',
        'For check all versions avaliable now you can check with << dpm upgrade help >>',
      )
      .stopEarly()
      .action(async (_, version: string) => {
        switch (version.toLowerCase()) {
          case 'canary': {
            await Run(
              `${Deno.execPath()} run -A --unstable https://raw.githubusercontent.com/dpmland/dpm/dev/install.ts canary`,
            );
            break;
          }

          case 'stable': {
            await Run(
              `${Deno.execPath()} run -A --unstable https://raw.githubusercontent.com/dpmland/dpm/dev/install.ts stable`,
            );
            break;
          }

          case 'help': {
            const COMMANDS_AVALIABLES = {
              canary:
                `Here you can install the canary or development version avaliable in GitHub!!`,
              stable:
                `Here you can install the stable version avaliable in deno.land/x`,
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

          default:
            break;
        }
      });
  }
}
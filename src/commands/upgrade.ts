// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command, emoji, Table } from 'mods/deps.ts';
import { Run } from 'runner/main.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import { RAW_URL } from 'mods/info.ts';
import { LOGGER } from 'mods/logger.ts';

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
        if (typeof version == 'undefined' || version == '') {
          LOGGER.error(
            'Need a version for start the update you can check this versions in << dpm upgrade help >>',
          );
          Deno.exit(2);
        }
        switch (version.toLowerCase()) {
          case 'canary': {
            await Run(
              `${BASE_DIRECTORIES.DENO_EXEC} run -A --unstable ${RAW_URL}/install.ts canary`,
            );
            break;
          }

          case 'stable': {
            await Run(
              `${BASE_DIRECTORIES.DENO_EXEC} run -A --unstable ${RAW_URL}/install.ts stable`,
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

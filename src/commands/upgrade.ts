// Copyright © 2024 Dpm Land. All Rights Reserved.

import { Command, Table } from 'mods/deps.ts';
import { Run } from 'runner/main.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';

export const UpgradeCommand = new Command()
  .description(
    `Upgrade the dpm executable to the canary and the stable version! 💂`,
  )
  .arguments('<version:string>')
  .example(
    'Versions  available?',
    'For check all versions  available now you can check with << dpm upgrade help >>',
  )
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
          `${BASE_DIRECTORIES.DENO_EXEC} run -A --unstable https://dpmland.deno.dev/install canary`,
        );
        break;
      }

      case 'stable': {
        await Run(
          `${BASE_DIRECTORIES.DENO_EXEC} run -A --unstable https://dpmland.deno.dev/install stable`,
        );
        break;
      }

      case 'help': {
        const AVAILABLE_COMMANDS = {
          canary:
            `Here you can install the canary or development version  available in GitHub!!`,
          stable:
            `Here you can install the stable version  available in deno.land/x`,
        };

        const table: Table = Table.from([]);

        for (const i of Object.entries(AVAILABLE_COMMANDS)) {
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

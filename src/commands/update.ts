// Copyright © 2024 Dpm Land. All Rights Reserved.

import { Command, Table } from 'mods/deps.ts';
import { LOGGER } from 'mods/logger.ts';
import * as update from 'packages/update.ts';

export const UpdateCommand = new Command()
  .description(`Update the dependencies from the dpm files! 📣`)
  .arguments('<action:string>')
  .action(async (_, action: string) => {
    switch (action.toLowerCase()) {
      case 'check': {
        await update.checkUpdates();
        break;
      }

      case 'now': {
        await update.writeUpdates();
        await update.updateDPMFiles();
        break;
      }

      case 'help': {
        const AVAILABLE_COMMANDS = {
          check:
            `Here you can see the dependencies to update and the current version of the dependency`,
          now:
            `With this command replace the old versions and write the new versions!`,
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

      default: {
        LOGGER.error(
          'File not found run < dpm update help > for more information',
        );
        Deno.exit(2);
      }
    }
  });

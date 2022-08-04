// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command, emoji, Table } from 'mods/deps.ts';
import { LOGGER } from 'mods/logger.ts';
import * as update from 'packages/update.ts';

export class UpdateCommand extends Command {
  #cmd?: Command;

  public constructor(cmd?: Command) {
    super();
    this.#cmd = cmd;

    return this.description(
      `Update the dependencies from the dpm files! ${emoji.get('mega')}`,
    )
      .arguments('[action:string]')
      .stopEarly()
      .action(async (_, action: string) => {
        switch (action.toLowerCase()) {
          case 'check': {
            await update.checkUpdates();
            break;
          }

          case 'now': {
            await update.writeUpdates();
            break;
          }

          case 'help': {
            const COMMANDS_AVALIABLES = {
              check:
                `Here you can see the dependencies to update and the current version of the dependency`,
              now:
                `With this command replace the old versions and write the new versions!`,
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

          default: {
            LOGGER.error(
              'File not found run < dpm update help > for more information',
            );
            Deno.exit(2);
          }
        }
      });
  }
}

// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command, emoji } from 'mods/deps.ts';
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
        switch (action) {
          case 'imports': {
            await update.updateImportMap();
            break;
          }

          default: {
            LOGGER.error(
              'File not found run < dpm doc update.files > for more information',
            );
            Deno.exit(2);
          }
        }
      });
  }
}

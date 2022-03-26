// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command, emoji } from 'mods/deps.ts';
import * as tools from 'tools/install.ts';
import { LOGGER } from 'mods/logger.ts';

export class ToolsCommand extends Command {
  #cmd?: Command;

  public constructor(cmd?: Command) {
    super();
    this.#cmd = cmd;

    return this.description(
      `You need some tools for develop with Deno well here are all tools! ${
        emoji.get('ok_hand')
      }`,
    )
      .arguments('[action:string]')
      .stopEarly()
      .action(async (_, action: string) => {
        switch (action) {
          case 'list': {
            tools.getAllTools();
            break;
          }

          case 'install': {
            await tools.installTools();
            break;
          }

          case 'clean': {
            await tools.cleanTools();
            break;
          }

          default: {
            LOGGER.error('Action not found run << dpm doc tools >>');
            break;
          }
        }
      });
  }
}

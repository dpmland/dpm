// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command, emoji, Table } from 'mods/deps.ts';
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
      .example(
        'Help',
        'You can check all commands avaliables with << dpm tools help >>',
      )
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

          case 'help': {
            const COMMANDS_AVALIABLES = {
              list: `Here you can get all tools to install with DPM`,
              install: `With this command you can install all tools!`,
              clean: `With this command you can uninstall all tools!`,
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
            LOGGER.error('Action not found run << dpm doc tools >>');
            break;
          }
        }
      });
  }
}

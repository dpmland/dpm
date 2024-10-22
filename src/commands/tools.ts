// Copyright © 2024 Dpm Land. All Rights Reserved.

import { Command, Table } from 'mods/deps.ts';
import * as tools from 'tools/install.ts';
import { LOGGER } from 'mods/logger.ts';

export const ToolsCommand = new Command()
  .description(
    `You need some tools for develop with Deno well here are all tools! 👌`,
  )
  .arguments('<action:string>')
  .example(
    'Help',
    'You can check all available commands with << dpm tools help >>',
  )
  .action(async (_, action) => {
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
        const AVAILABLE_COMMANDS = {
          list: `Here you can get all tools to install with DPM`,
          install: `With this command you can install all tools!`,
          clean: `With this command you can uninstall all tools!`,
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
        LOGGER.error('Action not found run << dpm doc tools >>');
        break;
      }
    }
  });

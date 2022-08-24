// Copyright © 2022 Dpm Land. All Rights Reserved.

import { colors, Command, Table } from 'mods/deps.ts';
import * as tasks from 'tasks/main.ts';
import { LOGGER } from 'mods/logger.ts';

export const TaskCommand = new Command()
  .description(`If you need automate some commands tasks is here! 🤖`)
  .alias('run')
  .option(
    '-u --update <update:boolean>',
    'Update the deno.json file for the new tasks of the dpm.json file!',
  )
  .option(
    '-a --add <add:boolean>',
    'Add a new task to the dpm.json file and the deno.json file!',
  )
  .option(
    '-l --list <list:string>',
    'List all tasks on the dpm.json or on the deno.json file!',
  )
  .example(
    'Use tasks',
    `This tool help you to make the tasks managment more easy for run the tasks you need ${
      colors.green(
        'deno task <taskName>',
      )
    }`,
  )
  .action(async ({ update, add, list }) => {
    // Update the tasks in the deno.json file from the dpm.json
    if (update == true) {
      await tasks.UpdateTasks();
      Deno.exit();
    }

    // Add a new task to the file with a ui
    if (add == true) {
      await tasks.addDpmTask();
      Deno.exit();
    }

    // Add the list and console out in table
    if (list != '') {
      list = typeof list == 'undefined' ? 'all' : list;
      list = typeof list == 'string' ? list.toLowerCase() : list;
      switch (list) {
        case 'deno': {
          await tasks.listDenoTasks();
          break;
        }

        case 'dpm': {
          await tasks.listDpmTasks();
          break;
        }

        case 'help': {
          const AVAILABLE_COMMANDS = {
            deno:
              `Here you can see all tasks  available in the deno.json file!`,
            dpm: `Here you can see all tasks  available in the dpm.json file!`,
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

        case 'all': {
          LOGGER.info('Showing the content of the deno files!');
          await tasks.listDenoTasks();
          LOGGER.info('Showing the content of the dpm files!');
          await tasks.listDpmTasks();
          break;
        }

        default: {
          LOGGER.error(
            'Not found the command! You can check more with dpm task help',
          );
        }
      }
    }
  });

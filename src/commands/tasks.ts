// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command, emoji } from 'mods/deps.ts';
import * as tasks from 'tasks/main.ts';
import { LOGGER } from 'mods/logger.ts';

export class TasksCommand extends Command {
  #cmd?: Command;

  public constructor(cmd?: Command) {
    super();
    this.#cmd = cmd;

    return this.description(
      `If you need automate some commands tasks is here! ${emoji.get('robot')}`,
    )
      .alias('run')
      .arguments('[action:string]')
      .option(
        '-u --update [update:boolean]',
        'Update the deno.json file for the new tasks of the dpm.json file!',
      )
      .option(
        '-l --list [list:string]',
        'List all tasks on the dpm.json or on the deno.json file!',
      )
      .stopEarly()
      .action(async (options, action: string) => {
        console.log(action);
        if (options.update) {
          await tasks.UpdateTasks();
          Deno.exit();
        }

        switch (options.list) {
          case 'deno': {
          }

          default: {
            LOGGER.error(
              'Error action not value: Only valid -> all, dpm, deno',
            );
            Deno.exit(2);
          }
        }
      });
  }
}

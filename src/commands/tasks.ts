// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command, emoji } from 'mods/deps.ts';
import { UpdateTasks } from 'tasks/main.ts';

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
      .stopEarly()
      .action(async (options, action: string) => {
        console.log(options.update);
        console.log(action);
        if (options.update) {
          await UpdateTasks();
          Deno.exit();
        }
      });
  }
}

// Copyright © 2022 Dpm Land. All Rights Reserved.

import { colors, Command, emoji } from 'mods/deps.ts';
import { RunDPX } from 'dpx/main.ts';

export class ExecCommand extends Command {
  #cmd?: Command;
  public constructor(cmd?: Command) {
    super();
    this.#cmd = cmd;

    return this.description(
      `With this tool you can run Deno X modules without installation. ${
        emoji.get('sauropod')
      }

      Extracted from Land: https://github.com/ije/land
      Thanks to Ije for make this amazing tool ${emoji.get('sunglasses')}`,
    )
      .alias('x')
      .arguments('[args...:string]')
      .example(
        'Help',
        `For run this tool you can use: ${
          colors.bold('dpm exec publish@2.5.0 --help')
        } for example`,
      )
      .stopEarly()
      .action(async (_, args: string[]) => {
        await RunDPX(args);
      });
  }
}

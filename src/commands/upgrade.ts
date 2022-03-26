// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command, emoji } from 'mods/deps.ts';
import { Upgrade } from 'core/upgrade/main.ts';

export class UpgradeCommand extends Command {
  #cmd?: Command;

  public constructor(cmd?: Command) {
    super();
    this.#cmd = cmd;

    return this.description(
      `You want upgrade dpm to the latest version! All new features are here! ${
        emoji.get('sunglasses')
      }`,
    )
      .arguments('[action:string]')
      .stopEarly()
      .action(async (_, action: string) => {
        await Upgrade(action);
        Deno.exit();
      });
  }
}

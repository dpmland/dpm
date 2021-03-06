// Copyright © 2022 Dpm Land. All Rights Reserved.

import { LOGGER } from 'mods/logger.ts';

export async function Run(command: string) {
  const cmd = command.split(' ');
  const run = Deno.run({
    cmd: cmd,
  });
  const { success } = await run.status();
  if (success == false) {
    LOGGER.error(`The command was not executed correctly:\n${command}`);
    Deno.exit(1);
  }
}

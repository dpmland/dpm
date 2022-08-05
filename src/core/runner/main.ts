// Copyright © 2022 Dpm Land. All Rights Reserved.

import { LOGGER } from 'mods/logger.ts';
import { colors } from 'mods/deps.ts';

export async function Run(command: string) {
  const cmd = command.split(' ');
  const run = Deno.run({
    cmd: cmd,
    stdout: 'piped',
    stderr: 'piped',
  });

  const { code } = await run.status();

  // Piped outs
  const rawErr = await run.stderrOutput();

  if (code === 0) {
    LOGGER.done(`The command: ${colors.dim(command)} was executed correctly`);
  } else {
    LOGGER.error(
      `The command was not executed crrectly:\n${
        colors.dim(command)
      }\n - Error Detailed:\n${
        colors.red(colors.bold(new TextDecoder().decode(rawErr)))
      }`,
    );
    Deno.exit(code);
  }
}

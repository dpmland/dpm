// Copyright © 2022 Dpm Land. All Rights Reserved.

import { LOGGER } from 'mods/logger.ts';
import { colors } from 'mods/deps.ts';

export async function Run(command: string) {
  console.log(`${colors.dim('$')} ${colors.bold(command)}`);
  const cmd = command.split(' ');
  const run = Deno.run({
    cmd: cmd,
    stdout: 'piped',
    stderr: 'piped',
  });

  const { code } = await run.status();

  // Piped outs
  const rawErr = await run.stderrOutput();

  if (code !== 0) {
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

//  https://github.com/ije/publish/blob/master/cli.ts#L172
export async function RunOut(command: string): Promise<string> {
  console.log(`${colors.dim('$')} ${colors.bold(command)}`);
  const cmd = command.split(' ');
  const p = Deno.run({
    cmd,
    stdout: 'piped',
    stderr: 'inherit',
  });
  const output = await p.output();
  await p.status();
  p.close();
  return (new TextDecoder()).decode(output).trim();
}

export async function OtherRunner(...cmd: string[]) {
  console.log(`${colors.dim('$')} ${colors.bold(cmd.join(' '))}`);

  const run = Deno.run({
    cmd: cmd,
    stdout: 'piped',
    stderr: 'piped',
  });

  const { code } = await run.status();

  // Piped outs
  const rawErr = await run.stderrOutput();

  if (code !== 0) {
    LOGGER.error(
      `The command was not executed crrectly:\n${
        colors.dim(cmd.join(' '))
      }\n - Error Detailed:\n${
        colors.red(colors.bold(new TextDecoder().decode(rawErr)))
      }`,
    );
    Deno.exit(code);
  }
}

// Copyright © 2022 Dpm Land. All Rights Reserved.

import { LOGGER } from 'mods/logger.ts';
import { colors } from 'mods/deps.ts';

export async function Run(command: string) {
  console.log(`${colors.dim('$')} ${colors.bold(command)}`);
  const cmd = command.split(' ');
  const run = new Deno.Command(cmd[0], { args: cmd.slice(1) });

  const result = await run.output();

  if (result.code !== 0) {
    console.error(
      `The command was not executed correctly:\n${
        colors.dim(command)
      }\n - Error Detailed:\n${
        colors.red(colors.bold(new TextDecoder().decode(result.stderr)))
      }`,
    );
    Deno.exit(result.code);
  }
}

//  https://github.com/ije/publish/blob/master/cli.ts#L172
export async function RunOut(command: string): Promise<string> {
  console.log(`${colors.dim('$')} ${colors.bold(command)}`);
  const cmd = command.split(' ');
  const p = new Deno.Command(cmd[0], {
    args: cmd.slice(1),
    stdout: 'piped',
    stderr: 'inherit',
  });
  const output = await p.output();
  return (new TextDecoder()).decode(output.stdout).trim();
}

export async function OtherRunner(...cmd: string[]) {
  console.log(`${colors.dim('$')} ${colors.bold(cmd.join(' '))}`);

  const run = new Deno.Command(cmd[0], {
    args: cmd.slice(1),
    stdout: 'piped',
    stderr: 'piped',
  });

  const out = await run.output();

  if (out.code !== 0) {
    LOGGER.error(
      `The command was not executed crrectly:\n${
        colors.dim(cmd.join(' '))
      }\n - Error Detailed:\n${
        colors.red(colors.bold(new TextDecoder().decode(out.stderr)))
      }`,
    );
    Deno.exit(out.code);
  }
}

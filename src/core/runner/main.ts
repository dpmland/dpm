// Copyright © 2022 Dpm Land. All Rights Reserved.

export async function Run(command: string) {
  const cmd = command.split(' ');
  const run = Deno.run({
    cmd: cmd,
  });
  await run.status();
}

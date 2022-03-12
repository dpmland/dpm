// Copyright © 2022 Dpm Land. All Rights Reserved.
//
// Extracted from here all credits for Jurassiscripts/velociraptor and for hayd/deno-udd
//
// https://github.com/jurassiscripts/velociraptor/blob/971b7db71cf635b0c8f2de822aa4270e52cce498/src/util.ts#L22-L39

import { LOGGER } from 'mods/logger.ts';

export async function spawn(args: string[], cwd?: string): Promise<string> {
  const process = Deno.run({
    cmd: args,
    cwd,
    stdout: 'piped',
    stderr: 'piped',
  });
  const { code } = await process.status();
  if (code === 0) {
    const rawOutput = await process.output();
    process.close();
    return new TextDecoder().decode(rawOutput);
  } else {
    const error = new TextDecoder().decode(await process.stderrOutput());
    process.close();
    LOGGER.error(error);
    throw new Error(error);
  }
}

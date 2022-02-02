// Copyright © 2022 Dpm Land. All Rights Reserved.

import { ReadDpmFile } from 'files/read.ts';
import { LOGGER } from 'mods/logger.ts';
import { Run } from 'runner/main.ts';

export async function readAndRunScripts(script: string, buildIn: boolean) {
  const scripts = await ReadDpmFile();
  let commands;
  if (buildIn) {
    commands = scripts.scripts.build_in;
  } else {
    commands = scripts.scripts;
  }
  if (script in commands) {
    LOGGER.info(`Running the command: ${commands[script]}`);
    await Run(commands[script]);
    Deno.exit();
  }
  LOGGER.error('Command not found');
}

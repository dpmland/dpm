// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Run } from 'runner/main.ts';
import { LOGGER } from 'mods/logger.ts';
import { table } from 'mods/deps.ts';
import * as spinners from 'mods/spinners.ts';

const TOOLS_TO_INSTALL = [
  {
    name: 'uud',
    description: 'Update the deno dependencies',
    url: 'https://deno.land/x/udd/main.ts',
  },
  {
    name: 'eggs',
    description: 'Upload the package to the nest.land register',
    url: 'https://x.nest.land/eggs@0.3.10/eggs.ts',
  },
  {
    name: 'land',
    description: 'Run deno x packages without installation like npx',
    url: 'https://deno.land/x/land/cli.ts',
  },
  {
    name: 'denon',
    description: 'Automatically restart for your Deno projects like nodemon',
    url: 'https://deno.land/x/denon/denon.ts',
  },
];

const DenoPath = Deno.execPath();

export function getAllTools() {
  LOGGER.info('All tools recommended for a better Deno development');
  const t = table(TOOLS_TO_INSTALL, ['name', 'description', 'url'], {
    upcaseHeader: true,
    emptyReplacer: 'No field provided',
    padding: 4,
  });
  console.log(t);
}

export async function installTools() {
  for (const i of TOOLS_TO_INSTALL) {
    const command = `${DenoPath} install -qAf --unstable -n ${i.name} ${i.url}`;
    spinners.Installing.start();
    await Run(command);
    spinners.Installing.succeed(`Successfully installed ${i.name}`);
  }
}

export async function cleanTools() {
  for (const i of TOOLS_TO_INSTALL) {
    const command = `${DenoPath} uninstall --unstable ${i.name}`;
    spinners.Deleting.start();
    await Run(command);
    spinners.Deleting.succeed('Uninstalled and cleaned all tools');
  }
}

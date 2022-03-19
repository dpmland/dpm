// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Run } from 'runner/main.ts';
import { LOGGER } from 'mods/logger.ts';
import { table } from 'mods/deps.ts';

const TOOLS_TO_INSTALL = [
  {
    name: 'uud',
    description:
      'Update Deno Dependencies - update dependency urls to their latest published versions. ONLY TYPESCRIPT FILES!',
    url: 'https://deno.land/x/udd/main.ts',
  },
  {
    name: 'eggs',
    description: 'Upload the package to the nest.land register',
    url: 'https://x.nest.land/eggs@0.3.10/eggs.ts',
  },
  {
    name: 'land',
    description: 'Run Deno X module without installation.',
    url: 'https://deno.land/x/land/cli.ts',
  },
  {
    name: 'vr',
    description:
      `Velociraptor is a script runner for Deno, inspired by npm's package.json scripts.`,
    url: 'https://deno.land/x/velociraptor/cli.ts',
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
    await Run(command);
    LOGGER.done(`Successfully installed ${i.name}`);
  }
}

export async function cleanTools() {
  for (const i of TOOLS_TO_INSTALL) {
    const command = `${DenoPath} uninstall --unstable ${i.name}`;
    await Run(command);
    LOGGER.done('Uninstalled and cleaned all tools');
  }
}

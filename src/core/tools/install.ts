// Copyright © 2024 Dpm Land. All Rights Reserved.

import { Run } from 'runner/main.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';
import { Table } from 'mods/deps.ts';

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
];

export function getAllTools() {
  LOGGER.info('All tools recommended for a better Deno development');
  TOOLS_TO_INSTALL.forEach((e) => {
    LOGGER.done(`Information About the ${e.name.toUpperCase()} App!`);
    const table: Table = Table.from([]);
    for (const i of Object.entries(e)) {
      table.push(i);
    }
    table.header(['Data', 'Description']);
    table.sort();
    table.border(true);
    table.render();
  });
}

export async function installTools() {
  for (const i of TOOLS_TO_INSTALL) {
    const command =
      `${BASE_DIRECTORIES.DENO_EXEC} install -qAf --unstable -n ${i.name} ${i.url}`;
    await Run(command);
    LOGGER.done(`Successfully installed ${i.name}`);
  }
}

export async function cleanTools() {
  for (const i of TOOLS_TO_INSTALL) {
    const command =
      `${BASE_DIRECTORIES.DENO_EXEC} uninstall --unstable ${i.name}`;
    await Run(command);
    LOGGER.done('Uninstalled and cleaned all tools');
  }
}

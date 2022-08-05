// Copyright © 2022 Dpm Land. All Rights Reserved.

import { colors, dracoFiles } from 'mods/deps.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';

export async function ListAllTemplates() {
  if (!dracoFiles.exists(BASE_DIRECTORIES.TEMPLATE_DIR)) {
    LOGGER.error(
      `Not found the TEMPLATE_DIR for search the Templates!! Please download licenses for use this command with: << dpm template -I repoOwner/repoName >> or check if exists: ${BASE_DIRECTORIES.TEMPLATE_DIR} path and if exists report the error on GitHub`,
    );
    Deno.exit(2);
  }

  LOGGER.info(`Templates avaliable in the TEMPLATE_DIR:`);

  for await (const e of Deno.readDir(`${BASE_DIRECTORIES.TEMPLATE_DIR}/`)) {
    if (e.isDirectory) {
      console.log(`${colors.dim('TEMPLATES:')} ${colors.magenta(e.name)}`);
    }
  }
  LOGGER.done(
    `This is all templates found in the directory can be used with ${
      colors.bold('dpm template --use templateName')
    }`,
  );
}

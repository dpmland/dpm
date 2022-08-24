// Copyright © 2022 Dpm Land. All Rights Reserved.

import { colors, dracoFiles } from 'mods/deps.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';

export async function ListAllTemplates() {
  if (!dracoFiles.exists(BASE_DIRECTORIES.TEMPLATE_DIR)) {
    LOGGER.error(
      `Not found the ${
        colors.bold('TEMPLATE_DIR')
      }!! Please download the templates with this command: << dpm template -I repoOwner/repoName >> or check if exists: ${
        colors.bold(BASE_DIRECTORIES.TEMPLATE_DIR)
      } path and if exists report the error on GitHub`,
    );
    Deno.exit(2);
  }

  LOGGER.info(`Templates  available in the TEMPLATE_DIR:`);

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

// Copyright © 2024 Dpm Land. All Rights Reserved.

import { colors, dracoFiles, join, renderMarkdown } from 'mods/deps.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';

export async function SearchTemplates(templates: string[]) {
  if (!dracoFiles.exists(BASE_DIRECTORIES.TEMPLATE_DIR)) {
    LOGGER.error(
      `Not found the TEMPLATE_DIR for search the Templates!! Please download licenses for use this command with: << dpm template -I repoOwner/repoName >> or check if exists: ${BASE_DIRECTORIES.TEMPLATE_DIR} path and if exists report the error on GitHub`,
    );
    Deno.exit(2);
  }

  for (const i of templates) {
    if (
      dracoFiles.exists(join(BASE_DIRECTORIES.TEMPLATE_DIR, i.toLowerCase()))
    ) {
      LOGGER.info(
        `The information about the template: ${colors.bold(i.toLowerCase())}`,
      );
      const content = await Deno.readTextFile(
        join(BASE_DIRECTORIES.TEMPLATE_DIR, i.toLowerCase(), 'README.md'),
      );
      console.log(
        renderMarkdown(content),
      );
    } else {
      LOGGER.error(
        `Not found the ${
          colors.bold(i.toLowerCase())
        } template!! Please download the templates with this command: << dpm template -I repoOwner/repoName >> or check if exists: ${
          colors.bold(join(BASE_DIRECTORIES.TEMPLATE_DIR, i.toLowerCase()))
        } path and if exists report the error on GitHub`,
      );
    }
  }

  LOGGER.done(
    `Successfully searched the templates: ${
      colors.underline(templates.join(', '))
    }`,
  );
}

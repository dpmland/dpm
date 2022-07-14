// Copyright © 2022 Dpm Land. All Rights Reserved.

import { LOGGER } from 'mods/logger.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import { dracoFiles, join, renderMarkdown } from 'mods/deps.ts';

const parseActionToFile = (file: string): string => {
  const f = file.toUpperCase();
  const pathsplit = f.split('.');
  let path;
  if (pathsplit.length > 2) {
    LOGGER.error('Supported only 2 params to search in docs');
    Deno.exit(1);
  }
  if (pathsplit.length == 2) {
    path = join(
      BASE_DIRECTORIES.DOCS,
      pathsplit[0].toLowerCase(),
      `${pathsplit[1]}.md`,
    );
  }
  if (pathsplit.length == 1) {
    path = join(BASE_DIRECTORIES.DOCS, `${pathsplit[0]}.md`);
  }
  path = (typeof path == 'undefined') ? 'nothing' : path;
  if (!(dracoFiles.exists(path))) {
    LOGGER.error('Documentation file dont exists check if this exists');
    Deno.exit(1);
  }
  return path;
};

export async function getDocumentation(action: string) {
  const path = parseActionToFile(action);
  if (path == 'nothing') {
    LOGGER.error('No path provided report error on github');
    Deno.exit(1);
  }
  console.log(renderMarkdown(await Deno.readTextFile(path)));
}

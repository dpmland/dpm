// Copyright © 2022 Dpm Land. All Rights Reserved.

import { fmt, join } from 'mods/deps.ts';
import { LOGGER } from 'mods/logger.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import { Run } from 'runner/main.ts';

// Parameters
export interface RepoParams {
  host?: string;
  depth?: number;
  cmd?: string;
}

export async function DownloadRepo(repos: string[], opts: RepoParams = {}) {
  // Valid the options and write the defaults
  opts.host = (typeof opts.host == 'undefined' || opts.host == null)
    ? 'https://github.com'
    : opts.host;

  opts.depth = (typeof opts.depth == 'undefined' || opts.depth == null)
    ? 5
    : opts.depth;

  opts.cmd = (typeof opts.cmd == 'undefined' || opts.cmd == null)
    ? 'git clone --depth=%s %s %s'
    : opts.cmd;

  // Format the command to execute
  for (const i of repos) {
    const valid = ((i.split('/').length == 2) ? true : false);
    if (valid) {
      await Run(
        fmt.sprintf(
          `${opts.cmd}`,
          String(opts.depth),
          `${opts.host}/${i}.git`,
          `${join(BASE_DIRECTORIES.TEMPLATE_DIR, i.split('/')[1])}`,
        ),
      );
    } else {
      LOGGER.error(`Isn´t a valid format for download -> repoOwner/repoName`);
    }
  }
}

// Copyright © 2024 Dpm Land. All Rights Reserved.

import { Run } from 'runner/main.ts';
import { LOGGER } from 'mods/logger.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import { dracoFiles, ensureDir } from 'mods/deps.ts';

export const DOCS_DOWNLOAD_REPO = 'https://github.com/dpmland/docs.git';

export async function DownloadDocs() {
  await ensureDir(BASE_DIRECTORIES.DOCS);
  if (dracoFiles.exists(BASE_DIRECTORIES.DOCS)) {
    LOGGER.warn('Removing the existing doc directory');
    await Deno.remove(BASE_DIRECTORIES.DOCS, { recursive: true });
    LOGGER.info('Downloading the documentation on the docs directory');
    const command =
      `git clone --depth 1 ${DOCS_DOWNLOAD_REPO} ${BASE_DIRECTORIES.DOCS}`;
    await Run(command);
    LOGGER.done('Done downloaded the local documentation');
    LOGGER.info('Updated the documentation successfully');
  }
}

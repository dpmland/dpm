// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Run } from 'runner/main.ts';
import { LOGGER } from 'mods/logger.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import { Downloading } from 'mods/spinners.ts';

export const DOCS_DOWNLOAD_REPO = 'https://github.com/dpmland/docs.git';

export async function downloadDocumentation() {
  LOGGER.info('Downloading the documentation on the repo');
  const command =
    `git clone --depth 1 ${DOCS_DOWNLOAD_REPO} ${BASE_DIRECTORIES.DOCS}`;
  Downloading.start();
  await Run(command);
  Downloading.succeed('Done downloaded the local documentation');
  Downloading.stop();
}

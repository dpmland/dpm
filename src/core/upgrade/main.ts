// Copyright © 2022 Dpm Land. All Rights Reserved.
//
// Inspired from https://github.com/hayd/deno-udd/blob/master/main.ts#L79

import { spawn } from 'core/upgrade/util.ts';
import { LOGGER } from 'mods/logger.ts';
import { checkIfUpdated } from 'core/upgrade/check.ts';

export const URL = {
  canary: {
    importMap: 'https://denopkg.com/dpmland/dpm@dev/import_map.json',
    cli: 'https://denopkg.com/dpmland/dpm@dev/cli.ts',
  },
  stable: {
    importMap: 'https://deno.land/x/dpm/import_map.json',
    cli: 'https://deno.land/x/dpm/cli.ts',
  },
};

export async function Upgrade(type: string) {
  switch (type) {
    case 'canary': {
      console.info(`
Updating Dpm to the Canary Version check the file!

CLI File: ${URL.canary.cli}
IMPORT MAP File: ${URL.canary.importMap}

---
`);
      await spawn([
        Deno.execPath(),
        'install',
        '--reload',
        '-qAfn',
        'dpm',
        '--import-map',
        URL.canary.importMap,
        '--unstable',
        URL.canary.cli,
      ]);
      LOGGER.info('Updated Succesfully Dpm to the Canary Version!');
      break;
    }

    case 'stable': {
      console.info(`
Updating Dpm to the Stable version check the files here!

CLI File: ${URL.stable.cli}
IMPORT MAP File: ${URL.stable.importMap}

---
`);
      await spawn([
        Deno.execPath(),
        'install',
        '--reload',
        '-qAfn',
        'dpm',
        '--import-map',
        URL.stable.importMap,
        '--unstable',
        URL.stable.cli,
      ]);
      LOGGER.info('Updated Succesfully Dpm to the Stable Version!');
      break;
    }

    case 'check': {
      await checkIfUpdated();
      break;
    }

    default: {
      LOGGER.error(
        'Option not found only supported 3 options for more information check << dpm doc upgrade.versions >>',
      );
      break;
    }
  }
}

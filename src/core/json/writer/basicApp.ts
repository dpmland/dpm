// Copyright © 2024 Dpm Land. All Rights Reserved.

import { Run } from 'runner/main.ts';
import { LOGGER } from 'mods/logger.ts';

export async function initBasicDenoApp(clean: boolean) {
  await Run('deno init');
  LOGGER.done('Successfully Writted a Deno Project example!');

  if (clean) {
    try {
      await Deno.remove('deno.json');
    } catch (err) {
      if (!(err instanceof Deno.errors.NotFound)) {
        LOGGER.error(
          `Not found the deno.json file created by deno cli: ${err}`,
        );
        Deno.exit(2);
      }
    }
    LOGGER.done('Successfully deleted the deno.json default file!');
  }
}

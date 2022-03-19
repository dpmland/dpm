// Copyright © 2022 Dpm Land. All Rights Reserved.

import Dlog from 'https://deno.land/x/dlog2@2.0/mini.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';

// Export the base LOGGER
export const LOGGER = new Dlog('DPM', true, BASE_DIRECTORIES.LOGS);

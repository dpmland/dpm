// Copyright © 2022 Dpm Land. All Rights Reserved.

import Denomander from 'https://deno.land/x/denomander@0.9.1/mod.ts';
import { DESCRIPTION, VERSION } from 'mods/info.ts';

// Export the base CLI
export const APP = new Denomander({
  app_name: 'dpm',
  app_version: VERSION,
  app_description: DESCRIPTION,
  errors: {
    INVALID_RULE: 'Invalid rule error on parsing',
    OPTION_NOT_FOUND: 'Flag not found run << dpm -h >> for more information',
    COMMAND_NOT_FOUND:
      'Command not found run << dpm -h >> or << dpm doc help >> for more information',
    REQUIRED_OPTION_NOT_FOUND:
      'Flag necessary for use this command run << dpm -h >> or << dpm doc help >>',
    REQUIRED_VALUE_NOT_FOUND:
      'Required value for the command is necessary run << dpm -h >> or << dpm doc help >> for more information',
    REQUIRED_COMMAND_VALUE_NOT_FOUND:
      'Is necessary a value for use this command run << dpm -h >> or << dpm doc help >>',
    TOO_MANY_PARAMS:
      'Many parameters not necessary run << dpm -h >> or << dpm doc help >> for more information',
    OPTION_CHOICE:
      'Invalid choice for the flag for more information run << dpm -h >> or << dpm doc help >> for more information >>',
    ONLY_ONE_COMMAND_ALLOWED: 'Only one command is allowed in default mode!',
  },
});

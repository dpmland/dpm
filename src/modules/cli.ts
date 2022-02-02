// Copyright © 2022 Dpm Land. All Rights Reserved.

import Denomander from 'https://deno.land/x/denomander@0.9.1/mod.ts';

// Export the base CLI
export const APP = new Denomander({
  app_name: 'dpm',
  app_version: '0.1.0',
  app_description:
    'Dpm <Deno Package Manager> is a simple, modern and easy way to manage the Deno Modules and dependencies that help to write and manage the deno libraries and code',
});

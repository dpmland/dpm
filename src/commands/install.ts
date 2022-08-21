// Copyright © 2022 Dpm Land. All Rights Reserved.
import { Command } from 'mods/deps.ts';
import { dracoFiles } from 'mods/deps.ts';
import { LOGGER } from 'mods/logger.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import {
  esmInstallation,
  installDepsToImports,
  installStdToImports,
} from 'packages/main.ts';
import { WriteDpmFileJson } from 'dpm/init.ts';

export const InstallCommand = new Command()
  .description(
    `If you want use external packages and dependencies can you use this tool! 🦅`,
  )
  .alias('add')
  .arguments('<dependency:string[]>')
  .option('--host <host:string>', 'Change from deno.land/x to other', {
    separator: ' ',
  })
  .option(
    '-s, --std <std:string[]>',
    'Add a dependency from the std library',
    { separator: ' ' },
  )
  .option(
    '-e --esm <esm:string[]>',
    'Add a dependency from the https://esm.sh register',
    { separator: ' ' },
  )
  .stopEarly()
  .action(
    async (
      { host, std, esm },
      dependency: string[],
    ) => {
      if (typeof dependency == 'string') {
        LOGGER.info(`Dependency to install: ${dependency}`);
      } else if (typeof dependency != 'undefined') {
        LOGGER.info(`Dependencies to install: ${dependency.join(' ,')}`);
      }
      if (dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE) == false) {
        await WriteDpmFileJson({});
        LOGGER.warn('Writing the default dpm file because not exists!');
      }
      if (std != undefined) {
        await installStdToImports(std);
        Deno.exit();
      }
      if (esm != undefined) {
        await esmInstallation(esm);
        Deno.exit();
      }
      await installDepsToImports(dependency, { host: host });
    },
  );

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
import { getPreffixAndSuffix } from 'packages/custom.ts';
import { writeDpmFile } from 'json/writer.ts';

export const InstallCommand = new Command()
  .description(
    `If you want to use external packages and dependencies you could look this tool! 🦅`,
  )
  .alias('add')
  .arguments('[dependency...:string]')
  .option('--host [host...:string]', 'Change from deno.land/x to other')
  .option(
    '-s, --std [std...:string]',
    'Add a dependency from the std library',
  )
  .option(
    '-e --esm [esm...:string]',
    'Add a dependency from the https://esm.sh register',
  )
  .option(
    '-c --custom [custom...:string]',
    'Custom installation for an dependency!',
  )
  .action(
    async (
      { host, std, esm, custom },
      dependency,
    ) => {
      if (dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE) == false) {
        await writeDpmFile({});
        LOGGER.warn('Writing the default dpm file because not exists!');
      }
      if (std != undefined && Array.isArray(std)) {
        await installStdToImports(std);
        Deno.exit();
      }
      if (esm != undefined && Array.isArray(esm)) {
        await esmInstallation(esm);
        Deno.exit();
      }
      if (custom != undefined && Array.isArray(custom)) {
        await getPreffixAndSuffix(custom);
        Deno.exit();
      }
      if (typeof dependency != 'undefined') {
        if (Array.isArray(dependency)) {
          LOGGER.info(`Dependencies to install: ${dependency.join(' ,')}`);
        } else {
          LOGGER.info(`Dependency to install: ${dependency}`);
        }
        if (typeof host == 'string') {
          await installDepsToImports(dependency.split(' '), { host: host! });
          Deno.exit();
        }
        await installDepsToImports(dependency.split(' '));
        Deno.exit();
      }
    },
  );

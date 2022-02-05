// Copyright © 2022 Dpm Land. All Rights Reserved.

import { APP } from 'mods/cli.ts';
import { GetAuthors } from 'mods/authors.ts';
import { ReadDpmFile } from 'files/read.ts';
import { readAndRunScripts } from 'core/scripts/build_in.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';
import { dracoInfo } from 'mods/deps.ts';
import { appendModuleToDpm } from 'packages/add.ts';
import {
  GetTheOptionsPrompt,
  WriteDpmFileJson,
  WriteImportMapJson,
} from 'files/init.ts';
import * as docs from 'docs/download.ts';
import * as install from 'tools/install.ts';
import { FormatInternalJSON } from 'runner/format.ts';

APP
  .errorMessages({
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
  });

APP
  .command('about [type]', 'Do you want know me use this command!')
  .argDescription(
    'type',
    'Type about for show the information for help run << dpm about help >>',
  )
  .action(async ({ type }: any) => {
    switch (type) {
      case 'deno': {
        LOGGER.info(`DENO VERSION: ${dracoInfo.DenoVersion}`);
        LOGGER.info(`DENO TYPESCRIPT: ${dracoInfo.DenoTypescript}`);
        LOGGER.info(`DENO V8: ${dracoInfo.DenoV8}`);
        break;
      }

      case 'dirs': {
        LOGGER.info(`CACHE AND LOGS DIRECTORY: ${BASE_DIRECTORIES.LOGS}`);
        LOGGER.info(`DOCS OFFLINE DIRECTORY: ${BASE_DIRECTORIES.DOCS}`);
        LOGGER.info(`CONFIG DIRECTORY: ${BASE_DIRECTORIES.CONFIG}`);
        LOGGER.info(`IMPORT MAP PATH: ${BASE_DIRECTORIES.IMPORT_MAPS}`);
        LOGGER.info(`DENO CONFIG: ${BASE_DIRECTORIES.DENO_JSON_FILE}`);
        LOGGER.info(`DEPS ONLY FILE: ${BASE_DIRECTORIES.DEPS_FILE_ONLY}`);
        LOGGER.info(`DEPS DIRECTORY AND FILE: ${BASE_DIRECTORIES.DEPS_DIR}`);
        LOGGER.info(`EGGS FILE GENERATOR: ${BASE_DIRECTORIES.EGGS_FILE}`);
        LOGGER.info(
          `DIRECTORY TO GENERATE THE dpm.json: ${BASE_DIRECTORIES.DPM_FILE}`,
        );
        break;
      }

      case 'dpmFile': {
        const data = await ReadDpmFile();
        console.log(data);
        break;
      }

      case 'authors': {
        GetAuthors();
        break;
      }

      case 'deps': {
        const data = await ReadDpmFile();
        console.log(data.dependencies);
        break;
      }

      case 'help': {
        console.log(
          `Types for use this command are:

- deno: Show the deno version information
- dirs: Show the directories used by dpm
- dpmFile: Show the content on the dpm file
- authors: Show the authors was created dpm
- deps: Show the dependencies on the dpm file`,
        );
        break;
      }

      default: {
        LOGGER.error(
          'Type for about not found check the documentation or run dpm about help',
        );
        break;
      }
    }
  });

APP
  .command('init', 'Init the dpm.json file')
  .alias('create', 'innit')
  .option('-y, --yes', 'Create the dpm.json file without prompt')
  .option('--fmt', 'Format the json files')
  .action(async ({ yes, fmt }: any) => {
    if (yes) {
      await WriteDpmFileJson({});
      await WriteImportMapJson();
      Deno.exit();
    }
    if (fmt) {
      await FormatInternalJSON();
      Deno.exit();
    }
    const app = await GetTheOptionsPrompt();
    await WriteDpmFileJson(app);
  });

APP
  .command('run [cmd]', 'Run the commands from the dpm file')
  .alias('r', 'exec')
  .option('--build', 'Run the build-in commands')
  .action(async ({ cmd }: any, { build }: any) => {
    if (build) {
      await readAndRunScripts(cmd, true);
      Deno.exit();
    }
    await readAndRunScripts(cmd, false);
    Deno.exit();
  });

// TODO(Teo): Add the uninstall tools and the usage for the uud
APP
  .command('tools [action]', 'Install and use the tools integrated')
  .description(
    'Some tools are necessary for complement the use with dpm well here are how install, list and use every tool with dpm help',
  )
  .action(({ action }: any) => {
    switch (action) {
      case 'list': {
        install.getAllTools();
        break;
      }

      case 'install': {
        install.installTools();
        break;
      }

      default: {
        LOGGER.error('Action not found run << dpm doc tools >>');
        break;
      }
    }
  });

// TODO(Teo): Add the dependencies to the import map file
APP
  .command('add [deps...]', 'Add dependencies to the dpm file')
  .option('--host', 'Change from deno.land/x to other')
  .option('-s --std', 'Add a dependency form the std library')
  .action(({ deps }: any, { host, std }: any) => {
    if (host != ' ') {
      console.log(appendModuleToDpm(deps, { host: host }));
      Deno.exit();
    }
    if (std) {
      LOGGER.info('Working in this feature');
      Deno.exit();
    }
    console.log(appendModuleToDpm(deps));
  });

APP
  .command('doc', 'Show documentation for a action or command')
  .alias('docs')
  .option('-d --download', 'Download the documentation!')
  .option('-u --update', 'Update the documentation!')
  .action(async ({ download, update }: any) => {
    if (download) {
      await docs.downloadDocumentation();
      Deno.exit();
    }
    if (update) {
      await docs.updateDocumentation();
      Deno.exit();
    }
  });

try {
  APP.parse(Deno.args);
} catch (e) {
  LOGGER.error(`ERROR PARSING THE ARGS: ${e}`);
}

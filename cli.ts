// Copyright © 2022 Dpm Land. All Rights Reserved.

// Documentation manager
import * as docs from 'docs/download.ts';
import { getDocumentation } from 'docs/main.ts';
// File manager
import { writeDenoConfigFile } from 'dpm/deno.ts';
import { generateReadme } from 'dpm/readme.ts';
import { generateEggsFile } from 'dpm/eggs.ts';
import { writeDepsTsFile } from 'dpm/deps.ts';
import {
  GetTheOptionsPrompt,
  WriteDpmFileJson,
  WriteImportMapJson,
} from 'dpm/init.ts';
import { ReadDpmFile } from 'dpm/read.ts';
// Module manager
import { GetAuthors } from 'mods/authors.ts';
import { APP } from 'mods/cli.ts';
import { dracoFiles, dracoInfo } from 'mods/deps.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';
// Package manager
import { installDepsToImports } from 'packages/main.ts';
import * as uninstall from 'packages/clean.ts';
import * as update from 'packages/update.ts';
import * as depsInstall from 'packages/deps/add.ts';
// Script manager
import { readAndRunScripts } from 'core/scripts/build_in.ts';
import { FormatInternalJSON } from 'runner/format.ts';
// Tool manager
import * as tools from 'tools/install.ts';

APP
  .command('init', 'Init the necessary files for better development with Deno')
  .alias('create', 'innit')
  .option('-A --all', 'Generate all files and format this using all tools!')
  .option('-y, --yes', 'Create the dpm.json file without prompt')
  .option('--deno', 'Create the deno config file for better development')
  .option('--dpm', 'Generate the dpm file without ask!')
  .option('--deps', 'Generate the deps.ts file for manage the dependencies')
  .option('--eggs', 'Generate the eggs file for publish in nest.land')
  .option('--fmt', 'Format the json files')
  .option('--importMap', 'Generate the import map file!')
  .option('--readme', 'Generate a readme with the dpm.json file')
  .action(
    async (
      { yes, fmt, deno, readme, importMap, all, eggs, dpm, deps }: any,
    ) => {
      const file = await ReadDpmFile();
      if (yes) {
        await WriteDpmFileJson({});
        if (file.config.importMap.enable == true) {
          await WriteImportMapJson();
        } else {
          await writeDepsTsFile();
        }
        Deno.exit();
      }
      if (fmt) {
        await FormatInternalJSON();
        Deno.exit();
      }
      if (deno) {
        await writeDenoConfigFile();
        Deno.exit();
      }
      if (deps) {
        await writeDepsTsFile();
        Deno.exit();
      }
      if (readme) {
        await generateReadme();
        Deno.exit();
      }
      if (importMap) {
        await WriteImportMapJson();
        Deno.exit();
      }
      if (eggs) {
        await generateEggsFile();
        Deno.exit();
      }
      if (dpm) {
        await WriteDpmFileJson({});
        Deno.exit();
      }
      if (all) {
        const app = await GetTheOptionsPrompt();
        await WriteDpmFileJson(app);
        await WriteImportMapJson();
        await writeDenoConfigFile();
        await generateReadme();
        await generateEggsFile();
        await FormatInternalJSON();
        Deno.exit();
      }
      const app = await GetTheOptionsPrompt();
      await WriteDpmFileJson(app);
      if (file.config.importMap.enable == true) {
        await WriteImportMapJson();
      } else {
        await writeDepsTsFile();
      }
    },
  );

APP
  .command(
    'install [deps...]',
    'Install dependencies to the dpm file and the import map file!',
  )
  .alias('i', 'add')
  .argDescription(
    'deps...',
    'The deps names can be one or many for more information run << dpm doc install.syntax >>',
  )
  .option('--host', 'Change from deno.land/x to other')
  .option('-s --std', 'Add a dependency from the std library')
  .action(async ({ deps }: any, { host, std }: any) => {
    if (dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE) == false) {
      await WriteDpmFileJson({});
      LOGGER.info('Writing the default dpm file because not exists!');
    }
    let file;
    if (dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE)) {
      file = await ReadDpmFile();
    }
    if (host != ' ') {
      if (file.config.importMap.enable == true) {
        await installDepsToImports(deps, { host: host });
      }
      if (file.config.depsFile.enable == true) {
        await depsInstall.addToDepsFile(deps, { host: host });
      }
      Deno.exit();
    }
    if (std) {
      LOGGER.info('Working in this feature');
      Deno.exit();
    }
    if (file.config.importMap.enable == true) {
      await installDepsToImports(deps, { host: host });
    }
    if (file.config.depsFile.enable == true) {
      await depsInstall.addToDepsFile(deps, { host: host });
    }
  });

APP
  .command(
    'uninstall [deps?...]',
    'Uninstall dependencies from the dpm file and the import file!',
  )
  .argDescription(
    'deps...',
    'Pass the argument the list or only one dependency for uninstall from the file!',
  )
  .alias('clean')
  .option('-A --all', 'Remove all dependencies from the files!')
  .action(async ({ _deps }: any, { all }: any) => {
    if (typeof all == 'boolean') {
      if (all == true) {
        await uninstall.cleanAllDeps();
      }
    }
  });

APP
  .command('update [action]', 'Update the dependencies from the dpm files')
  .argDescription(
    'action',
    'Pass the correct argument for update the files like: << imports >> for the import_map file and << files >> for the dep.ts file',
  )
  .action(async ({ action }: any) => {
    switch (action) {
      case 'imports': {
        await update.updateImportMap();
        break;
      }

      case 'files': {
        LOGGER.warn('Working in this feature!');
        break;
      }

      default: {
        LOGGER.error(
          'File not found run < dpm doc update.files > for more information',
        );
        Deno.exit(2);
      }
    }
  });

APP
  .command('run [cmd]', 'Run the commands from the dpm file!')
  .argDescription(
    'cmd',
    'For use the commands defined in the scripts you need pass the name for the command like << dpm run fmt >>',
  )
  .alias('r', 'exec')
  .option('-b --build', 'Run the build-in commands')
  .action(async ({ cmd }: any, { build }: any) => {
    if (build) {
      await readAndRunScripts(cmd, true);
      Deno.exit();
    }
    await readAndRunScripts(cmd, false);
    Deno.exit();
  });

APP
  .command('doc [action?]', 'Show documentation for a action or command')
  .argDescription(
    'action',
    'Pass the argument to search in documentation with the correct syntax like << dpm doc command.action >>',
  )
  .alias('docs')
  .option('-d --download', 'Download the documentation!')
  .option('-u --update', 'Update the documentation!')
  .action(async ({ action }: any, { download, update }: any) => {
    if (download == true) {
      await docs.downloadDocumentation();
      Deno.exit();
    }
    if (update == true) {
      await docs.updateDocumentation();
      Deno.exit();
    }
    if (action) {
      await getDocumentation(action);
      Deno.exit();
    }
  });

APP
  .command(
    'about [action]',
    'Do you known some information or commands of dpm can you check more here!',
  )
  .alias('info')
  .argDescription(
    'action',
    'action about for show the information for help run << dpm doc about.commands >>',
  )
  .action(async ({ action }: any) => {
    switch (action) {
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

      default: {
        LOGGER.error(
          'Type for about not found check the documentation or run dpm doc about',
        );
        break;
      }
    }
  });

APP
  .command('tools [action]', 'Install and use the tools integrated')
  .argDescription(
    'action',
    'Pass the correct argument for the actions the avaliable options are << list, install and clean >> the first show the tools to install the second install the tools to use and the third uninstall all tools',
  )
  .description(
    'Some tools are necessary for complement the use with dpm well here are how install, list and use every tool with dpm help',
  )
  .action(async ({ action }: any) => {
    switch (action) {
      case 'list': {
        tools.getAllTools();
        break;
      }

      case 'install': {
        await tools.installTools();
        break;
      }

      case 'clean': {
        await tools.cleanTools();
        break;
      }

      default: {
        LOGGER.error('Action not found run << dpm doc tools >>');
        break;
      }
    }
  });

try {
  APP.parse(Deno.args);
} catch (e) {
  LOGGER.error(`ERROR PARSING THE ARGS: ${e}`);
}

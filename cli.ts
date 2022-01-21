import { APP } from 'mods/cli.ts';
import { GetAuthors } from 'mods/authors.ts';
import { AppendModuleToDpm, ReadDpmFile } from 'files/read.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';
import { dracoInfo } from 'mods/deps.ts';
import { GetTheOptionsPrompt, WriteDpmFileJson } from 'files/init.ts';

APP
  .command('about [type]', 'Show the data about this project')
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

      case 'authors': {
        GetAuthors();
        break;
      }

      case 'deps': {
        const data = await ReadDpmFile();
        console.log(data);
        console.log(typeof (data));
        break;
      }

      case 'help': {
        console.log(
          'Exists many types for about: deno, authors etc, more information with dpm doc about.help',
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
  .action(async () => {
    if (APP.yes) {
      WriteDpmFileJson({});
      Deno.exit();
    }
    const app = await GetTheOptionsPrompt();
    WriteDpmFileJson(app);
  });

APP
  .command('add [deps...]', 'Add dependencies to the dpm file')
  .option('-h --host', 'Change from deno.land/x to other')
  .action(({ deps }: any) => {
    AppendModuleToDpm(deps);
  });

try {
  APP.parse(Deno.args);
} catch (e) {
  LOGGER.error(`ERROR PARSING THE ARGS: ${e}`);
}

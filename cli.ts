import { APP } from 'mods/cli.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';
import { dracoInfo } from 'mods/deps.ts';

APP
  .command('dirs', 'Show the directories currently used')
  .description('Here you can find the directories was ussing dpm')
  .action(() => {
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
  });

APP
  .command('about', 'Show the data about this project')
  .action(() => {
    LOGGER.info(`DENO VERSION: ${dracoInfo.DenoVersion}`);
    LOGGER.info(`DENO TYPESCRIPT: ${dracoInfo.DenoTypescript}`);
    LOGGER.info(`DENO V8: ${dracoInfo.DenoV8}`);
  });

try {
  APP.parse(Deno.args);
} catch (e) {
  LOGGER.error(`ERROR PARSING THE ARGS: ${e}`);
}

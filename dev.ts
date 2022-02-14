import { Run } from 'runner/main.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { dracoFiles, join } from 'mods/deps.ts';

if (Deno.args[0] == 'upload') {
  console.log('Formatting and checking the lint with deno!');
  await Run(`${Deno.execPath()} fmt -c deno.json`);
  console.log('Formatted!');
  await Run(`${Deno.execPath()} lint -c deno.json`);
  console.log('Linted!');
  console.log('Ready To Upload dont forget use the Contributing guides!');
  Deno.exit();
}

if (Deno.args[0] == 'help') {
  console.log(
    'With this tool you can check the requirements and develop more easy and fast dpm!\nMore info on https://github.com/dpmland/dpm/blob/dev/CONTRIBUTING.md\nAvaliable Commands:\n CLEAN, UPLOAD!',
  );
  Deno.exit();
}

if (Deno.args[0] == 'clean') {
  console.log('Cleanning the files!');
  if (dracoFiles.exists(BASE_DIRECTORIES.IMPORT_MAPS)) {
    await Deno.remove(BASE_DIRECTORIES.IMPORT_MAPS);
    console.log(`Removed the ${NAME_DIRECTORIES.IMPORT_MAPS} file!`);
  }
  if (dracoFiles.exists(BASE_DIRECTORIES.DENO_JSON_FILE)) {
    await Deno.remove(BASE_DIRECTORIES.DENO_JSON_FILE);
    console.log(`Removed the ${NAME_DIRECTORIES.DENO_JSON_FILE} file!`);
  }
  if (dracoFiles.exists(BASE_DIRECTORIES.DEPS_DIR)) {
    await Deno.remove(BASE_DIRECTORIES.DEPS_DIR, { recursive: true });
    console.log(`Removed the ${NAME_DIRECTORIES.DEPS_DIR} dir!`);
  }
  if (dracoFiles.exists(BASE_DIRECTORIES.IMPORT_MAPS_DIR)) {
    await Deno.remove(BASE_DIRECTORIES.IMPORT_MAPS_DIR, { recursive: true });
    console.log(`Removed the ${NAME_DIRECTORIES.IMPORT_MAPS_DIR} dir!`);
  }
  if (dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE)) {
    await Deno.remove(BASE_DIRECTORIES.DPM_FILE);
    console.log(`Removed the ${NAME_DIRECTORIES.DPM_FILE} file!`);
  }
  if (dracoFiles.exists(BASE_DIRECTORIES.EGGS_FILE)) {
    await Deno.remove(BASE_DIRECTORIES.EGGS_FILE);
    console.log(`Removed the ${NAME_DIRECTORIES.EGGS_FILE} file!`);
  }
  if (dracoFiles.exists(BASE_DIRECTORIES.DEPS_FILE_ONLY)) {
    await Deno.remove(BASE_DIRECTORIES.DEPS_FILE_ONLY);
    console.log(`Removed the ${NAME_DIRECTORIES.DEPS_FILE_ONLY} file!`);
  }
  if (dracoFiles.exists(join(dracoFiles.currentDir(), '.dpm'))) {
    await Deno.remove(join(dracoFiles.currentDir(), '.dpm'), {
      recursive: true,
    });
    console.log(`Removed the .dpm dir!`);
  }
  console.log('Cleaned!');
  Deno.exit();
}

console.log('For more information run ddpm help!');

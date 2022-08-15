// Copyright © 2022 Dpm Land. All Rights Reserved.

import { ReadDenoConfigFile, ReadDpmFile } from 'dpm/read.ts';
import { LOGGER } from 'mods/logger.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { dracoFiles, Input, prompt, Table } from 'mods/deps.ts';

// Utils
function checkFiles() {
  // Valid if exists
  if (!dracoFiles.exists(BASE_DIRECTORIES.DENO_JSON_FILE)) {
    LOGGER.error(
      `Not found the ${NAME_DIRECTORIES.DENO_JSON_FILE} file on the current directory! Please init this with << dpm init -f deno-config >> or with << dpm init -A >>`,
    );
    Deno.exit(2);
  }

  if (!dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE)) {
    LOGGER.error(
      `Not found the ${NAME_DIRECTORIES.DPM_FILE} file on the current directory! Please init this with << dpm init -f dpm >> or with << dpm init -A >>`,
    );
    Deno.exit(2);
  }
}

export async function UpdateTasks() {
  // Valid if exists
  checkFiles();

  // Read the files
  const [dpm, deno] = await Promise.all([
    ReadDpmFile(),
    ReadDenoConfigFile(),
  ]);

  // Copy the deno to dpm and dpm to deno
  Object.assign(deno.tasks, dpm.scripts);
  Object.assign(dpm.scripts, deno.tasks);

  // Update the files!
  await Deno.writeTextFile(
    BASE_DIRECTORIES.DPM_FILE,
    JSON.stringify(dpm, null, '  '),
  );
  await Deno.writeTextFile(
    BASE_DIRECTORIES.DENO_JSON_FILE,
    JSON.stringify(deno, null, '  '),
  );

  LOGGER.done(
    `Updated successfully the ${NAME_DIRECTORIES.DPM_FILE} and the ${NAME_DIRECTORIES.DENO_JSON_FILE} file`,
  );
}

export async function listDenoTasks() {
  if (!dracoFiles.exists(BASE_DIRECTORIES.DENO_JSON_FILE)) {
    LOGGER.error(
      `Not found the ${NAME_DIRECTORIES.DENO_JSON_FILE} file on the current directory! Please init this with << dpm init -f deno-config >> or with << dpm init -A >>`,
    );
    Deno.exit(2);
  }

  const deno = await ReadDenoConfigFile();
  // Helpers!
  const tasks = deno.tasks;
  const table: Table = Table.from([]);
  for (const i of Object.entries(tasks)) {
    const it = i as [string, string];
    table.push(it);
  }
  table.header(['Task Name', 'Command']);
  table.sort();
  table.border(true);
  table.render();
}

export async function listDpmTasks() {
  if (!dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE)) {
    LOGGER.error(
      `Not found the ${NAME_DIRECTORIES.DPM_FILE} file on the current directory! Please init this with << dpm init -f dpm >> or with << dpm init -A >>`,
    );
    Deno.exit(2);
  }

  const dpm = await ReadDpmFile();
  // Helpers
  const tasks = dpm.scripts;
  const table: Table = Table.from([]);
  for (const i of Object.entries(tasks)) {
    const it = i as [string, string];
    table.push(it);
  }
  table.header(['Task Name', 'Command']);
  table.sort();
  table.border(true);
  table.render();
}

async function generateThePrompt() {
  return await prompt([
    {
      name: 'commandName',
      message: 'What is the command name',
      type: Input,
    },
    {
      name: 'commandValue',
      message: 'What is the value of the command. Example: echo "hi" ',
      type: Input,
    },
  ]);
}

export async function addDpmTask() {
  // Valid if exists the necessary files
  checkFiles();
  // Get the file content
  const [dpm, data] = await Promise.all([
    ReadDpmFile(),
    generateThePrompt(),
  ]);
  const scripts = dpm.scripts;

  scripts[`${data.commandName || 'notValid'}`] = `${
    data.commandValue || 'echo \'error\''
  }`;

  await Deno.writeTextFile(
    BASE_DIRECTORIES.DPM_FILE,
    JSON.stringify(dpm, null, '  '),
  );
  LOGGER.done('Added successfully the new command to the dpm.json file');
  await UpdateTasks();
}

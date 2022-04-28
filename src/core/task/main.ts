// Copyright © 2022 Dpm Land. All Rights Reserved.

import { ReadDenoConfigFile, ReadDpmFile } from 'dpm/read.ts';
import { LOGGER } from 'mods/logger.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { dracoFiles, Table } from 'mods/deps.ts';

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
  const dpm = await ReadDpmFile();
  const deno = await ReadDenoConfigFile();

  // Write a helper
  const helper = {
    build_in: {},
  };
  Object.assign(helper.build_in, dpm.scripts.build_in);

  // Delete the build_in key
  delete dpm.scripts['build_in'];

  // Copy the deno to dpm and dpm to deno
  Object.assign(deno.tasks, dpm.scripts);
  Object.assign(dpm.scripts, deno.tasks, helper);

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
  delete dpm.scripts['build_in'];
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

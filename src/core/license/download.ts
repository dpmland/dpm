// Copyright © 2022 Dpm Land. All Rights Reserved.

import { dracoFiles, ensureDir, join, walk } from 'mods/deps.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';
import { httpClient } from 'mods/http.ts';
import { readDpmFile } from 'json/reader.ts';

export async function DownloadTemplate() {
  const URL =
    'https://api.github.com/repos/nishanths/license/contents/.templates';

  // Get the version url
  const response = await httpClient(URL);

  for await (const file of response.data) {
    const res = await fetch(file.download_url);

    const data = await res.text();
    const name = file.name.toUpperCase().replace('.TMPL', '');

    await ensureDir(BASE_DIRECTORIES.LICENSE_DIR);
    Deno.writeTextFileSync(
      `${join(BASE_DIRECTORIES.LICENSE_DIR, name)}`,
      data,
    );
    LOGGER.done(
      `Successfully downloaded the license ${name}`,
    );
  }
}

function checkFiles() {
  if (!dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE)) {
    LOGGER.error(
      `Not found the ${NAME_DIRECTORIES.DPM_FILE} file on the current directory! Please init this with << dpm init -f dpm >> or with << dpm init -A >>`,
    );
    Deno.exit(2);
  }
  if (!dracoFiles.exists(BASE_DIRECTORIES.LICENSE_DIR)) {
    LOGGER.error(
      `Not found the LICENSE PATH for search the licenses!! Please download the directory with: << dpm init -L >> or check if exists: ${BASE_DIRECTORIES.LICENSE_DIR} path and if exists report the error on GitHub`,
    );
    Deno.exit(2);
  }
}

export async function GetLicense() {
  checkFiles();
  const DPM = await readDpmFile();
  const LICENSE_PATH = join(
    BASE_DIRECTORIES.LICENSE_DIR,
    DPM.license.toUpperCase(),
  );

  if (!dracoFiles.exists(LICENSE_PATH)) {
    LOGGER.error(`Not found in the path the license file!!`);
    Deno.exit();
  }

  if (!('author' in DPM)) {
    LOGGER.error(
      'Author key not found check the correct syntax of the file! More information on << dpm doc init.syntax >> or run << dpm init --dpm for restart the dpm file >>',
    );
    Deno.exit(2);
  }

  if (!('license' in DPM)) {
    LOGGER.error(
      'License key not found check the correct syntax of the file! More information on << dpm doc init.syntax >> or run << dpm init --dpm for restart the dpm file >>',
    );
    Deno.exit(2);
  }

  let license = await Deno.readTextFile(LICENSE_PATH);

  // Update the file with the new content
  license = license.replace('{{.Year}}', new Date().getFullYear().toString());
  license = license.replace('{{.Name}}', DPM.author);

  await Deno.writeTextFile(`${join(Deno.cwd(), 'LICENSE')}`, license);
  LOGGER.done(
    `Successfully created the license: ${DPM.license.toUpperCase()} in the current directory!!`,
  );
}

export async function ListAllLicenses() {
  if (!dracoFiles.exists(BASE_DIRECTORIES.LICENSE_DIR)) {
    LOGGER.error(
      `Not found the LICENSE PATH for search the licenses!! Please download the directory with: << dpm init -L >> or check if exists: ${BASE_DIRECTORIES.LICENSE_DIR} path and if exists report the error on GitHub`,
    );
    Deno.exit(2);
  }

  LOGGER.info(`Licenses  available in the LICENSE_DIR:`);

  for await (const e of walk(`${BASE_DIRECTORIES.LICENSE_DIR}/`)) {
    if (e.isFile) {
      console.log(`LICENSE: ${e.name}`);
    }
  }
  LOGGER.done(
    `This is all licenses  available in the directory and can used in the DPM file`,
  );
}

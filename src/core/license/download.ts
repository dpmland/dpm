// Copyright © 2022 Dpm Land. All Rights Reserved.
import { dracoFiles, ensureDir, join, soxa } from 'mods/deps.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';
// import { ReadDpmFile } from 'dpm/read.ts';

export async function DownloadTemplate(verbose?: boolean) {
  const URL =
    'https://api.github.com/repos/nishanths/license/contents/.templates';

  // Get the version url
  const response = await soxa.get(URL).catch((error) => {
    LOGGER.error(`Error getting the url to download the LICENSE ${error}`);
  });

  for await (const file of response.data) {
    const res = await fetch(file.download_url);

    const data = await res.text();
    const name = file.name.toUpperCase().replace('.TMPL', '');

    await ensureDir(BASE_DIRECTORIES.LICENSE_DIR);
    Deno.writeTextFileSync(
      `${join(BASE_DIRECTORIES.LICENSE_DIR, name)}`,
      data,
    );
    if (verbose == true) {
      LOGGER.done(
        `Successfully downloaded the license ${name}]`,
      );
    }
  }
}

function checkFiles() {
  if (!dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE)) {
    LOGGER.error(
      `Not found the ${NAME_DIRECTORIES.DPM_FILE} file on the current directory! Please init this with << dpm init -f dpm >> or with << dpm init -A >>`,
    );
    Deno.exit(2);
  }
}

export function GetLicense(verbose?: boolean) {
  checkFiles();
  // TODO: Add the get function reading and searching the license from the dir
  console.log(verbose);
}

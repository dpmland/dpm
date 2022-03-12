// Copyright © 2022 Dpm Land. All Rights Reserved.

import { soxa } from 'mods/deps.ts';
import { LOGGER } from 'mods/logger.ts';
import { table } from 'mods/deps.ts';
import { VERSION } from 'mods/info.ts';

// GitHub API Url check if exits if is bug!
export const LATEST_URL_GITHUB =
  'https://api.github.com/repos/dpmland/dpm/releases/latest';

export async function checkIfUpdated() {
  const githubInformation = await soxa.get(LATEST_URL_GITHUB);
  if (githubInformation.data) {
    const update = [
      {
        name: githubInformation.data.name,
        tag: githubInformation.data.tag_name,
        prerelease: githubInformation.data.prerelease,
        published: githubInformation.data.published_at,
        author: githubInformation.data.author.login,
      },
    ];
    const t = table(update, [
      'name',
      'tag',
      'prerelease',
      'published_at',
      'author',
    ], {
      upcaseHeader: true,
      emptyReplacer: 'No field provided',
      padding: 4,
    });
    console.log(t);
    if (
      VERSION != githubInformation.data.tag_name &&
      typeof githubInformation.data.tag_name != 'undefined'
    ) {
      console.log('\n');
      LOGGER.warn('NEW VERSION CHECK THE UPDATE:');
      console.info(
        `Heeey good news! New version update from ${VERSION} to ${githubInformation.data.tag_name} with << dpm upgrade stable >> or with << dpm upgrade canary >>`,
      );
    }
  } else {
    LOGGER.error(
      'Not exists a release wtf ? Report the bug on github please :)',
    );
    Deno.exit(1);
  }
}

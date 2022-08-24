// Copyright © 2022 Dpm Land. All Rights Reserved.

import { LOGGER } from 'mods/logger.ts';
import { colors } from 'mods/deps.ts';

export async function httpClient(url: string) {
  const response = await fetch(url).catch((e) => {
    LOGGER.error(
      `Can't get the content of the response in the url: ${colors.bold(url)}\n${
        colors.bold('Caused by:')
      }\n${e}`,
    );
    Deno.exit(2);
  });

  if (!response.ok) {
    LOGGER.error(
      `Response error: ${colors.bold(`STATUS: ${response.statusText}`)}`,
    );
    Deno.exit(2);
  }

  if (response.headers.get('content-type')?.includes('application/json')) {
    return await response.json();
  } else if (
    response.headers.get('content-type')?.includes('application/javascript')
  ) {
    return await response.text();
  }

  LOGGER.error(`Not valid content-type for the http client of DPM`);
  Deno.exit(2);
}

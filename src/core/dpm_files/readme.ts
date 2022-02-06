// Copyright © 2022 Dpm Land. All Rights Reserved.

import { ReadDpmFile } from 'dpm/read.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';

export async function generateReadme() {
  const data = await ReadDpmFile();
  const file = `
# ${data.name}

---

${data.description}

## Information

- **Author:** ${data.author}
- **Version:** ${data.version}
- **License:** ${data.license}

---

Made by [dpm](https://github.com/dpmland/dpm)
`;
  try {
    await Deno.writeTextFile(
      BASE_DIRECTORIES.README,
      file,
    );
  } catch (e) {
    LOGGER.error(e);
    Deno.exit(1);
  }
  LOGGER.info(`Generated succesfully the ${NAME_DIRECTORIES.README} file`);
}

// Copyright © 2022 Dpm Land. All Rights Reserved.

import { ReadDpmFile } from 'dpm/read.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { writeFileFormatted } from 'dpm/util.ts';

export async function generateReadme(print?: boolean) {
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
  await writeFileFormatted({
    content: file,
    path: BASE_DIRECTORIES.README,
    name: NAME_DIRECTORIES.README,
    type: 'md',
    print: print,
  });
}

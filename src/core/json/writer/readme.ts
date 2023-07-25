// Copyright © 2022 Dpm Land. All Rights Reserved.

import { readDpmFile } from 'json/reader.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { writeFileFormatted } from 'json/utils/magicPrint.ts';

export async function writeReadmeFile(print?: boolean) {
  const data = await readDpmFile();
  const file = `
# ${data.name} :mage:

---

${data.description}

## Information :book:

- **Author:** ${data.author}
- **Version:** ${data.version}
- **License:** ${data.license}

---

Made with the [Deno Package Manager](https://github.com/dpmland/dpm) Help :sauropod: :alien:
`;
  await writeFileFormatted({
    content: file,
    path: BASE_DIRECTORIES.README,
    name: NAME_DIRECTORIES.README,
    type: 'md',
    print: print,
  });
}

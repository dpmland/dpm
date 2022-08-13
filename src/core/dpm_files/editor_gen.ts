// Copyright © 2022 Dpm Land. All Rights Reserved.

import { NAME_DIRECTORIES } from 'mods/dirs.ts';
import { join } from 'mods/deps.ts';
import { writeFileFormatted } from 'dpm/util.ts';
import { ask } from 'mods/ask.ts';

export async function EditorJSONConfig() {
  const ans = await ask.input({
    name: 'editor',
    message: 'Editor to write the config',
  });
  const JSON_LSP = {
    deno: {
      enable: true,
      lint: true,
      unstable: true,
      importMap: `./${NAME_DIRECTORIES.IMPORT_MAPS}`,
      config: `./${NAME_DIRECTORIES.DENO_JSON_FILE}`,
    },
  };
  switch (ans.editor) {
    case 'vscode': {
      const path = join(Deno.cwd(), '.vscode', 'settings.json');

      await writeFileFormatted({
        content: JSON.stringify(JSON_LSP),
        path: path,
        name: join('.vscode', 'settings.json'),
        type: 'json',
        print: true,
      });
      break;
    }
  }
}

// Copyright © 2022 Dpm Land. All Rights Reserved.

import { NAME_DIRECTORIES } from 'mods/dirs.ts';
import { colors, join } from 'mods/deps.ts';
import { writeFileFormatted } from 'dpm/util.ts';
import { ask } from 'mods/ask.ts';
import { LOGGER } from 'mods/logger.ts';

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

  const SUPPORTED_EDITORS =  ['vscode', 'nvim', 'vim']

  if (typeof ans.editor != 'string' || ans.editor == '') {
    LOGGER.error('Not valid type of the editor please enter a valid editor');
    Deno.exit(2);
  }

  switch (ans.editor) {
    case 'vscode': {
      const path = join(Deno.cwd(), '.vscode', 'settings.json');

      await writeFileFormatted({
        content: JSON.stringify(JSON_LSP, null, '  '),
        path: path,
        name: join('.vscode', 'settings.json'),
        type: 'json',
        print: true,
      });
      break;
    }

    case 'nvim': {
      const path = join(Deno.cwd(), '.nlsp-settings', 'denols.json');

      await writeFileFormatted({
        content: JSON.stringify(JSON_LSP, null, '  '),
        path: path,
        name: join('.nlsp-settings', 'denols.json'),
        type: 'json',
        print: true,
      });

      LOGGER.info(
        `For use this settings you need the plugin: ${
          colors.dim('https://github.com/tamago324/nlsp-settings.nvim')
        }`,
      );
      break;
    }

    case 'vim': {
      const path = join(Deno.cwd(), '.vim', 'coc-settings.json');

      await writeFileFormatted({
        content: JSON.stringify(JSON_LSP, null, '  '),
        path: path,
        name: join('.vim', 'coc-settings.json'),
        type: 'json',
        print: true,
      });

      LOGGER.info(
        `For use this settings you need the plugin: ${
          colors.dim('https://github.com/neoclide/coc.nvim')
        }`,
      );
      break;
    }

    default: {
      LOGGER.info(`Only supported this editors: ${colors.dim(SUPPORTED_EDITORS.join(', '))}`)
      LOGGER.error(
        `The ${
          colors.dim(ans.editor?.toUpperCase()!)
        } editor not have support with DPM if you want add support for this please send a PR to the GitHub repo thanks :p`,
      );
      Deno.exit(2);
    }
  }
}

// Copyright © 2022 Dpm Land. All Rights Reserved.

import { instantiate } from 'bundler/minify/lib/minify_dpm.generated.js';
import {
  colors,
  Confirm,
  extname,
  jsonColorize,
  List,
  Select,
} from 'mods/deps.ts';
import { LOGGER } from 'mods/logger.ts';

export async function minifyFiles() {
  const ext: string = await Select.prompt({
    message: 'What is the extension of the files or file to minify?',
    options: [
      { name: 'HTML', value: 'html' },
      { name: 'JavaScript', value: 'js' },
      { name: 'CSS', value: 'css' },
      Select.separator('---------------'),
      { name: 'JSON', value: 'json' },
    ],
  });
  const files: string[] = await List.prompt({
    message: 'Files to search?',
    info: true,
  });

  const { minify_js, minify_css, minify_html, minify_json } =
    await instantiate();

  for (const i of files) {
    if (
      extname(i).replace('.', '') != ext
    ) {
      LOGGER.error(
        `The ${
          colors.bold(i.replace('./', '').toUpperCase())
        } is not equals to the selected minify option: .${
          colors.bold(ext.toUpperCase())
        }`,
      );
      Deno.exit(2);
    }
    const txt = await Deno.readTextFile(i);
    switch (extname(i).replace('.', '')) {
      case 'html': {
        let content = '<!-- File generated with the DPM Help -->\n';
        content += minify_html(txt);
        console.log(content);
        const write: boolean = await Confirm.prompt(
          'Do you want write this in the file?',
        );
        if (write) {
          await Deno.writeTextFile(i, content);
        }
        LOGGER.done(
          `Minified the file ${colors.bold(i.toUpperCase())} successfully`,
        );
        break;
      }
      case 'js': {
        let content = '// File generated with the DPM Help\n';
        content += minify_js(txt);
        console.log(content);
        const write: boolean = await Confirm.prompt(
          'Do you want write this in the file?',
        );
        if (write) {
          await Deno.writeTextFile(i, content);
        }
        LOGGER.done(
          `Minified the file ${colors.bold(i.toUpperCase())} successfully`,
        );
        break;
      }

      case 'css': {
        let content = '/* File generated with the DPM Help */\n';
        content += minify_css(txt);
        console.log(content);
        const write: boolean = await Confirm.prompt(
          'Do you want write this in the file?',
        );
        if (write) {
          await Deno.writeTextFile(i, content);
        }
        LOGGER.done(
          `Minified the file ${colors.bold(i.toUpperCase())} successfully`,
        );
        break;
      }

      case 'json': {
        const content = minify_json(txt);
        jsonColorize.colorize(content);
        const write: boolean = await Confirm.prompt(
          'Do you want write this in the file?',
        );
        if (write) {
          await Deno.writeTextFile(i, content);
        }
        LOGGER.done(
          `Minified the file ${colors.bold(i.toUpperCase())} successfully`,
        );
        break;
      }
    }
  }
}

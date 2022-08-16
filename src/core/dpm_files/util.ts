// Util for the Print and more beautifull out!

import { colors, ensureFile, jsonColorize, renderMarkdown } from 'mods/deps.ts';
import { LOGGER } from 'mods/logger.ts';

interface writeFormatOpts {
  content: string;
  path: string;
  name: string;
  type: 'md' | 'json';
  print?: boolean;
}

export async function writeFileFormatted(
  options: writeFormatOpts,
) {
  if (options.print == true) {
    LOGGER.done(`Content of the ${options.name} file ....`);
    if (options.type == 'md') {
      console.log(renderMarkdown(options.content));
    }
    if (options.type == 'json') {
      jsonColorize.colorize(options.content, { pretty: true });
    }
  }

  await ensureFile(options.path).catch((e) => {
    LOGGER.error(
      `Error at ensure file for the directories.\nCaused by:\n${
        colors.bold(e)
      }`,
    );
    Deno.exit(2);
  });

  await Deno.writeTextFile(options.content, options.path).catch((e) => {
    LOGGER.error(
      `Error at write text file in the ${
        colors.dim(options.path)
      }.\nCaused by:\n${colors.bold(e)}`,
    );
    Deno.exit(2);
  });

  LOGGER.info(`Succesfully writed the ${options.name.toUpperCase()} file`);
}

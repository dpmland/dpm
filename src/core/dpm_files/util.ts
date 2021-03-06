// Util for the Print and more beautifull out!

import { jsonColorize, renderMarkdown } from 'mods/deps.ts';
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
    LOGGER.done('File generated by DPM ...');
    if (options.type == 'md') {
      console.log(renderMarkdown(options.content));
    }
    if (options.type == 'json') {
      jsonColorize.colorize(options.content, { pretty: true });
    }
  }
  await writeFiles(options.content, options.path, options.name);
  console.log(renderMarkdown('---'));
}

async function writeFiles(content: string, path: string, name: string) {
  try {
    await Deno.writeTextFile(
      path,
      content,
    );
  } catch (e) {
    LOGGER.error(e);
    Deno.exit(1);
  }
  LOGGER.info(`Generated succesfully the ${name.toUpperCase()} file`);
}

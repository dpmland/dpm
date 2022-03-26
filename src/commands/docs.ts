// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command, emoji } from 'mods/deps.ts';
import * as docs from 'docs/download.ts';
import { getDocumentation } from 'docs/main.ts';

export class DocsCommand extends Command {
  #cmd?: Command;

  public constructor(cmd?: Command) {
    super();
    this.#cmd = cmd;

    return this.description(
      `Do you want know more about one command? ${emoji.get('thinking')}`,
    )
      .alias('doc')
      .arguments('[action:string]')
      .option(
        '-d, --download [download:boolean]',
        'Download the documentation for make this offline from the DPM Official Repo!',
      )
      .option(
        '-u --update [update:boolean]',
        'Update the documentation and clean the old documentation!',
      )
      .stopEarly()
      .action(async (options, action: string) => {
        if (action) {
          await getDocumentation(action);
          Deno.exit();
        }
        if (options.download == true) {
          await docs.downloadDocumentation();
          Deno.exit();
        }
        if (options.update == true) {
          await docs.updateDocumentation();
          Deno.exit();
        }
      });
  }
}

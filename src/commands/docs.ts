// Copyright © 2022 Dpm Land. All Rights Reserved.
import { Command, open } from 'mods/deps.ts';
import { LOGGER } from 'mods/logger.ts';
import * as docs from 'docs/download.ts';
import { getDocumentation } from 'docs/main.ts';

export const DocsCommand = new Command()
  .description(`Do you want know more about one command? 🤔.`)
  .alias('doc')
  .arguments('<action:string>')
  .option(
    '-d, --download <download:boolean>',
    'Download the documentation for make this offline from the DPM Official Repo!',
  )
  .option(
    '-u --update <update:boolean>',
    'Update the documentation and clean the old documentation!',
  )
  .option(
    '-o --online <docs:boolean>',
    'Open the online documentation if you want a complete experience',
  )
  .option(
    '-D, --discord <discord:boolean>',
    'Open the discord server if you want ask or propose something',
  )
  .stopEarly()
  .action(async ({ download, update, online, discord }, action: string) => {
    if (action) {
      await getDocumentation(action);
      Deno.exit();
    }
    if (download == true) {
      await docs.downloadDocumentation();
      Deno.exit();
    }
    if (online == true) {
      LOGGER.info('Opening the Official Online Documentation site of DPM!');
      await open('https://dpmland.github.io/');
      LOGGER.done('Opened successfully the Documentation Site!');
      Deno.exit();
    }
    if (discord == true) {
      LOGGER.info('Opening the Official Discord Server of DPM!');
      await open('https://discord.gg/Um27YPJKud');
      LOGGER.done('Opened successfully the Discord Server Invitation!');
      Deno.exit();
    }
    if (update == true) {
      await docs.updateDocumentation();
      Deno.exit();
    }
  });

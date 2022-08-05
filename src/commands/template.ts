// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command, emoji } from 'mods/deps.ts';
import { DownloadRepo } from 'templates/download.ts';
import { ListAllTemplates } from 'templates/list.ts';
import { SearchTemplates } from 'templates/search.ts';

export class TemplateCommand extends Command {
  #cmd?: Command;

  public constructor(cmd?: Command) {
    super();
    this.#cmd = cmd;

    return this.description(
      `Well you need a start a project and need a template here are all templates!! ${
        emoji.get('unicorn')
      }`,
    )
      .option(
        '-I, --install [install...:string]',
        'The install the templates for offline usage',
      )
      .option(
        '-l --list [list:boolean]',
        'List all installed templates in the directory!',
      )
      .option(
        '-s --search [search...:string]',
        'Search and show a README of a template!',
      )
      .alias('tmpl')
      .example(
        'Help',
        'You can check all commands avaliables with << dpm template help >>',
      )
      .stopEarly()
      .action(async (options) => {
        if (options.install != undefined) {
          await DownloadRepo(options.install);
        }
        if (options.list == true) {
          await ListAllTemplates();
        }
        if (options.search != undefined) {
          await SearchTemplates(options.search);
        }
      });
  }
}

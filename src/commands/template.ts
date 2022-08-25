// Copyright © 2022 Dpm Land. All Rights Reserved.
import { Command } from 'mods/deps.ts';
import { DownloadRepo } from 'templates/download.ts';
import { ListAllTemplates } from 'templates/list.ts';
import { SearchTemplates } from 'templates/search.ts';
import { useTemplate } from 'templates/usage.ts';

export const TemplateCommand = new Command()
  .description(
    `Well you need a start a project and need a template here are all templates!! 🦄`,
  )
  .option(
    '-I, --install <install:string[]>',
    'The install the templates for offline usage',
  )
  .option(
    '-l --list [list:boolean]',
    'List all installed templates in the directory!',
  )
  .option(
    '-s --search <search:string[]>',
    'Search and show a README of a template!',
  )
  .option(
    '-u --use <use:string[]>',
    'Copy the template to the current directory and run << dpm init -y >>',
  )
  .alias('tmpl')
  .example(
    'Help',
    'You can check all available commands with << dpm template help >>',
  )
  .action(async ({ install, search, use, list }) => {
    if (install != undefined) {
      await DownloadRepo(install);
    }
    if (list == true) {
      await ListAllTemplates();
    }
    if (search != undefined) {
      await SearchTemplates(search);
    }
    if (use != undefined) {
      await useTemplate(use);
    }
  });

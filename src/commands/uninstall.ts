// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command } from 'mods/deps.ts';
import * as uninstall from 'packages/clean.ts';

export const UninstallCommand = new Command()
  .description(
    `Uninstall dependencies from the dpm file and the import file! 🧙`,
  )
  .alias('remove')
  .arguments('<dependency:string[]>')
  .option('-A, --all <all:boolean>', 'Remove all dependencies from the files!')
  .action(async ({ all }, dependency: string[]) => {
    if (typeof all == 'boolean') {
      if (all) {
        await uninstall.cleanAllDeps();
        Deno.exit();
      }
    }
    await uninstall.cleanAnyDependency(dependency);
  });

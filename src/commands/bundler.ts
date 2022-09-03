// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command } from 'mods/deps.ts';
import { generateTypescriptDep } from 'bundler/generate_ts/main.ts';

export const BundlerCommand = new Command()
  .description(
    `Do you want simplfy files or generate files? Generate with this 🤟`,
  )
  .arguments('[action:string]')
  .action(async (_, action) => {
    console.log(action);
    await generateTypescriptDep();
  });

// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command } from 'mods/deps.ts';

export const BundlerCommand = new Command()
  .description(
    `Do you want simplfy files or generate files? Generate with this 🤟`,
  )
  .arguments('[action:string]')
  .action((_, action) => {
    console.log(action);
  });

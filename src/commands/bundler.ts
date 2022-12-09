// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command } from 'mods/deps.ts';
import { generateTypescriptDep } from 'bundler/generate_ts/main.ts';
import { minifyFiles } from 'bundler/minify/cmd/main.ts';
import { generateInstaller } from 'bundler/monk/main.ts';

export const BundlerCommand = new Command()
  .description(
    `Do you want simplfy files or generate files? Generate with this 🤟`,
  )
  .arguments('[action:string]')
  .action(async (_, action) => {
    switch (action) {
      case 'minify': {
        await minifyFiles();
        break;
      }
      case 'mini': {
        await minifyFiles();
        break;
      }

      case 'installer': {
        await generateInstaller();
        break;
      }

      case 'monk': {
        await generateInstaller();
        break;
      }

      case 'typescript': {
        await generateTypescriptDep();
        break;
      }

      case 'ts': {
        await generateTypescriptDep();
        break;
      }

      default:
        break;
    }
  });

// Copyright © 2022 Dpm Land. All Rights Reserved.

import { colors, Command } from 'mods/deps.ts';
import { Publish } from 'publish/main.ts';

export const PublishCommand = new Command()
  .description(`For publish your package to the world you can run this! 🤓`)
  .example(
    'Note: Publish deno.land/x/',
    `This tool only generate the tag the commit and push to release if you want add this to the deno.land/x/ go to${
      colors.bold(
        'https://deno.land/add_module',
      )
    } and complete the steps`,
  )
  .example(
    'Note: Publish to nest.land',
    `For publish to the nest.land register you can run this command and when ask to you run ${
      colors.dim(
        'eggs publish',
      )
    } to yes but you need configure this check the info here ${
      colors.bold(
        'https://docs.nest.land/eggs/linking-your-api-key',
      )
    }`,
  )
  .action(async (_) => {
    await Publish();
  });

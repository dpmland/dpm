// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Run } from './src/core/runner/main.ts';
import { colors, dracoFiles, join } from './src/modules/deps.ts';
import { ask } from './src/modules/ask.ts';
import { BASE_DIRECTORIES } from './src/modules/dirs.ts';
import figlet from 'https://x.nest.land/deno-figlet@0.0.5/mod.js';
import Random from 'https://deno.land/x/random@v1.1.2/Random.js';

console.log(colors.cyan(await figlet('DPM INSTALLER')));

const r = new Random();
const numb = r.int(0, 100);

const answers = await ask.prompt([
  {
    name: 'versionOpt',
    message: 'Install canary or stable ( Answers: canary | stable )',
  },
]);

switch (answers.versionOpt) {
  case 'canary': {
    console.log('Installing from canary!\n');
    await Run(
      `git clone -b dev --depth=1 https://github.com/dpmland/dpm ${
        join(BASE_DIRECTORIES.TEMP, 'canary', `v${numb}`)
      }`,
    );
    console.log();
    console.log('Running the installation with the Deno help!\n');
    await Run(
      `deno install -qAf --unstable ${
        join(BASE_DIRECTORIES.TEMP, 'canary', `v${numb}`, 'dpm.ts')
      }`,
    );
    break;
  }

  case 'stable': {
    console.log('Install from stable!\n');
    await Run(
      `git clone -b main --depth=1 https://github.com/dpmland/dpm ${
        join(BASE_DIRECTORIES.TEMP, 'stable', `v${numb}`)
      }`,
    );
    console.log();
    console.log('Running the installation with the Deno help!\n');
    await Run(
      `deno install -qAf --unstable ${
        join(BASE_DIRECTORIES.TEMP, 'stable', `v${numb}`, 'dpm.ts')
      }`,
    );
    break;
  }

  default: {
    console.log(
      colors.red(
        'Not found this target only 2 options: canary | stable.\nClosing the installer',
      ),
    );
    Deno.exit(2);
    break;
  }
}

console.log();

const answers2 = await ask.prompt([
  {
    name: 'allTools',
    message: 'Do you want install the documentation and all tools?',
    type: 'confirm',
  },
]);

if (answers2.allTools) {
  console.log(
    colors.magenta('Installing the offline documentation with DPM!\n'),
  );
  await Run(
    `deno run -A --unstable --quiet ${
      join(BASE_DIRECTORIES.TEMP, 'canary', `v${numb}`, 'dpm.ts')
    } docs -d`,
  );
  console.log(colors.magenta('Installing the tools with DPM!\n'));
  await Run(
    `deno run -A --unstable --quiet ${
      join(BASE_DIRECTORIES.TEMP, 'canary', `v${numb}`, 'dpm.ts')
    } tools install`,
  );
  console.log(colors.yellow('Installed all tools and the documentation!'));
}

console.log(colors.brightGreen(await figlet('DONE!')));
console.log('🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n');
console.log(
  `Run ${colors.green('dpm --help')} for usage information\n`,
);
console.log(
  `See ${
    colors.green('https://discord.gg/Um27YPJKud')
  } for help and propose new ideas at Discord!\n`,
);

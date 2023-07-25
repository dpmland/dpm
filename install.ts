// Copyright © 2022 Dpm Land. All Rights Reserved.

import * as colors from 'https://deno.land/std@0.158.0/fmt/colors.ts';
import { join } from 'https://deno.land/std@0.158.0/path/mod.ts';
import { dracoFiles, dracoInfo } from 'https://deno.land/x/draco@0.1.3/mod.ts';
import dir from 'https://deno.land/x/dir@1.5.1/mod.ts';
import Ask from 'https://deno.land/x/ask@1.0.6/mod.ts';
import { Monk } from 'https://deno.land/x/monk@0.1.2/mod.ts';

// Utilities
// Runner function
async function Run(command: string) {
  console.log(`${colors.dim('$')} ${colors.bold(command)}`);
  const cmd = command.split(' ');
  const run = new Deno.Command(cmd[0], { args: cmd.slice(1) });

  const result = await run.output();

  if (result.code !== 0) {
    console.error(
      `The command was not executed correctly:\n${
        colors.dim(command)
      }\n - Error Detailed:\n${
        colors.red(colors.bold(new TextDecoder().decode(result.stderr)))
      }`,
    );
    Deno.exit(result.code);
  }
}

// Bin path for the executable
const BIN = join(dir('home')!, '.deno', 'bin');

// Prompt
const ask = new Ask({
  suffix: '?',
  prefix: '>',
});

let installation: 'canary' | 'stable' = 'stable';

if (Deno.args[0] == 'canary') {
  installation = 'canary';
}
if (Deno.args[0] == 'stable') {
  installation = 'stable';
}

await Monk({
  versions: {
    downloadVersion: installation,
    stable: {
      url: 'https://github.com/dpmland/dpm',
      branch: 'main',
    },
    canary: {
      url: 'https://github.com/dpmland/dpm',
      branch: 'dev',
    },
  },
  files: {
    appName: 'dpm',
    stable: {
      importMapFile: './import_map.json',
      mainFile: './dpm.ts',
    },
    canary: {
      importMapFile: './import_map.json',
      mainFile: './dpm.ts',
    },
  },

  social: {
    github: 'https://github.com/dpmland/dpm',
    discord: 'https://discord.com/invite/Um27YPJKud',
    errors: 'https://github.com/dpmland/dpm/issues',
  },
});

const answers2 = await ask.prompt([
  {
    name: 'allTools',
    message: 'Do you want install the documentation and all tools?',
    type: 'confirm',
  },
]);

if (answers2.allTools) {
  console.log(
    colors.magenta(
      'Installing the offline documentation and templates with DPM!\n',
    ),
  );
  if (dracoInfo.platform() == 'windows') {
    if (dracoFiles.exists(join(BIN, 'dpm.exe'))) {
      await Run(`${join(BIN, 'dpm.exe')} docs -I`);
      console.log(colors.yellow('Installed the documentation!'));
      if (installation == 'canary') {
        await Run(`${join(BIN, 'dpm')} init -D`);
        console.log(colors.yellow('Installed the license templates!'));
      }
    } else {
      console.log(
        colors.red(
          'Not found the file compiled! Re run the installer or report the error on github.',
        ),
      );
    }
  } else if (
    dracoInfo.platform() == 'linux' || dracoInfo.platform() == 'darwin'
  ) {
    if (dracoFiles.exists(join(BIN, 'dpm'))) {
      await Run(`${join(BIN, 'dpm')} docs -I`);
      console.log(colors.yellow('Installed the documentation!'));
      if (installation == 'canary') {
        await Run(`${join(BIN, 'dpm')} init -I`);
        console.log(colors.yellow('Installed the license templates!'));
      }
    } else {
      console.log(
        colors.red(
          'Not found the file compiled! Re run the installer or report the error on github.',
        ),
      );
    }
  }
}

console.log(
  `Run ${colors.green('dpm --help')} for usage information\n`,
);

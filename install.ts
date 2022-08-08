// Copyright © 2022 Dpm Land. All Rights Reserved.

import * as colors from 'https://deno.land/std@0.149.0/fmt/colors.ts';
import { join } from 'https://deno.land/std@0.149.0/path/mod.ts';
import { copy } from 'https://deno.land/std@0.149.0/fs/copy.ts';
import { dracoFiles, dracoInfo } from 'https://deno.land/x/draco@0.1.3/mod.ts';
import Ask from 'https://deno.land/x/ask@1.0.6/mod.ts';
import figlet from 'https://x.nest.land/deno-figlet@0.0.5/mod.js';
// Utilities
// Runner function
async function Run(command: string) {
  const cmd = command.split(' ');
  const run = Deno.run({
    cmd: cmd,
  });
  const { success } = await run.status();
  if (success == false) {
    console.error(
      colors.red(`The command was not executed correctly:\n${command}`),
    );
    Deno.exit(1);
  }
}

// Temp Path
const TEMP = join(dracoFiles.homeDir()!, '.deno', 'dpm');
// Bin path for the executable
const BIN = join(dracoFiles.homeDir()!, '.deno', 'bin');

// Prompt
const ask = new Ask({
  suffix: '?',
  prefix: '>',
});

// Copy the files to the bin function!

async function MoveBinToMain() {
  if (dracoInfo.platform() == 'windows') {
    if (dracoFiles.exists(join(TEMP, 'canary', 'dpm.ts'))) {
      console.log(colors.cyan('Found the DPM executable!'));
      console.log(colors.cyan('Copying the executable to the BIN path!'));
      await copy(
        `${join(Deno.cwd(), 'dpm.exe')}`,
        `${join(BIN, 'dpm.exe')}`,
        { overwrite: true },
      );
      console.log(
        colors.cyan('Removing the dpm.exe file from the current path!'),
      );
      await Deno.remove(`${join(Deno.cwd(), 'dpm.exe')}`);
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
    if (dracoFiles.exists(join(TEMP, 'canary', 'dpm.ts'))) {
      console.log(colors.cyan('Found the DPM executable!'));
      console.log(colors.cyan('Copying the executable to the BIN path!'));
      await copy(
        `${join(Deno.cwd(), 'dpm')}`,
        `${join(BIN, 'dpm')}`,
        { overwrite: true },
      );
      console.log(colors.cyan('Removing the dpm file from the current path!'));
      await Deno.remove(`${join(Deno.cwd(), 'dpm')}`);
    } else {
      console.log(
        colors.red(
          'Not found the file compiled! Re run the installer or report the error on github.',
        ),
      );
    }
  } else {
    console.log(
      colors.red(
        'Not found the main TypeScript File! Re run the installer or report the error on github.',
      ),
    );
  }
}

// Seppare by functions the CANARY and the STABLE

export async function CanaryInstallation() {
  console.log('Installing from canary!\n');
  if (dracoFiles.exists(join(TEMP, 'canary'))) {
    await Deno.remove(join(TEMP, 'canary'), { recursive: true });
    console.log(colors.yellow('Cleaned the temp dpm dir!\n'));
  }
  await Run(
    `git clone -b dev --depth=1 https://github.com/dpmland/dpm ${
      join(TEMP, 'canary')
    }`,
  );
  console.log();
  console.log('Compiling the executable for better preformance!\n');
  await Run(
    `${Deno.execPath()} compile -A --unstable --import-map ${
      join(TEMP, 'canary', './import_map.json')
    } --target ${Deno.build.target} ${join(TEMP, 'canary', 'dpm.ts')}`,
  );
  await MoveBinToMain();
}

export async function StableInstallation() {
  console.log('Install from stable!\n');
  if (dracoFiles.exists(join(TEMP, 'stable'))) {
    await Deno.remove(join(TEMP, 'stable'), { recursive: true });
    console.log(colors.yellow('Cleaned the temp dpm dir!\n'));
  }
  await Run(
    `git clone -b main --depth=1 https://github.com/dpmland/dpm ${
      join(TEMP, 'stable')
    }`,
  );
  console.log();
  console.log('Running the installation with the Deno help!\n');
  await Run(
    `${Deno.execPath()} compile -A --unstable --import-map ${
      join(TEMP, 'stable', './import_map.json')
    } --target ${Deno.build.target} ${join(TEMP, 'stable', 'dpm.ts')}`,
  );
  await MoveBinToMain();
}

// Add the directly access without the prompt!

if (Deno.args[0] == 'canary') {
  await CanaryInstallation();
  Deno.exit();
}
if (Deno.args[0] == 'stable') {
  await StableInstallation();
  Deno.exit();
}

/*********************************************/
/*********************************************/
/**        START THE INSTALLER WORK          */
/*********************************************/
/*********************************************/

console.log(colors.cyan(await figlet('DPM UP')));

const answers = await ask.prompt([
  {
    name: 'versionOpt',
    message: 'Install canary or stable ( Answers: canary | stable )',
  },
]);

switch (answers.versionOpt) {
  case 'canary': {
    await CanaryInstallation();
    break;
  }

  case 'stable': {
    await StableInstallation();
    break;
  }

  default: {
    console.log(
      colors.red(
        'Not found this target only 2 options: canary | stable.\nClosing the installer',
      ),
    );
    Deno.exit(2);
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
    colors.magenta(
      'Installing the offline documentation and templates with DPM!\n',
    ),
  );
  if (dracoInfo.platform() == 'windows') {
    if (dracoFiles.exists(join(BIN, 'dpm.exe'))) {
      await Run(`${join(BIN, 'dpm.exe')} docs -u`);
      console.log(colors.yellow('Installed the documentation!'));
      await Run(`${join(BIN, 'dpm.exe')} init -D`);
      console.log(colors.yellow('Installed the license templates!'));
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
      await Run(`${join(BIN, 'dpm')} docs -u`);
      console.log(colors.yellow('Installed the documentation!'));
      await Run(`${join(BIN, 'dpm')} init -D`);
      console.log(colors.yellow('Installed the license templates!'));
    } else {
      console.log(
        colors.red(
          'Not found the file compiled! Re run the installer or report the error on github.',
        ),
      );
    }
  }
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

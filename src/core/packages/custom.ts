// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Checkbox, colors, dracoFiles, Input, Select } from 'mods/deps.ts';
import {
  appendModuleToDpm,
  appendStdToFile,
  esmGetVersion,
  getTheVersionOfDep,
} from 'packages/add.ts';
import { BASE_DIRECTORIES, NAME_DIRECTORIES } from 'mods/dirs.ts';
import { writeDpmFile, writeImportMapFile } from 'json/writer.ts';
import { readDpmFile, readImportMapFile } from 'json/reader.ts';
import { LOGGER } from 'mods/logger.ts';

export async function getPreffixAndSuffix(depsName: string[]) {
  let dep: string, preffix = '', suffix = '';

  // Valid the file exists
  if (
    !(dracoFiles.exists(BASE_DIRECTORIES.IMPORT_MAPS))
  ) {
    await writeImportMapFile();
  }
  if (!(dracoFiles.exists(BASE_DIRECTORIES.DPM_FILE))) {
    await writeDpmFile({});
  }

  // read the files
  const [data, dpm] = await Promise.all([
    readImportMapFile(),
    readDpmFile(),
  ]);

  if (!('dependencies' in dpm)) {
    LOGGER.error(
      'Dependency key not found check the correct syntax of the file! More information on << dpm doc init.syntax >> or run << dpm init --dpm for restart the dpm file >>',
    );
    Deno.exit(2);
  }
  if (!('imports' in data)) {
    LOGGER.error(
      'Imports key not found check the correct syntax of the file! More information on << dpm doc init.syntax >> or run << dpm init --dpm >> for restart the dpm file',
    );
    Deno.exit(2);
  }

  const imports = data.imports;
  const deps = dpm.dependencies;

  if (depsName.length > 0) {
    dep = 'dependency';
  } else {
    dep = 'dependencies';
  }

  const register: string = await Select.prompt({
    message: `Select a register for install the ${dep}`,
    options: [
      { name: 'Deno X Register', value: 'denox' },
      { name: 'Deno Std', value: 'denostd' },
      { name: 'Esm.sh', value: 'esm' },
      Select.separator('---------'),
      { name: 'Custom register', value: 'custom' },
    ],
  });

  const custom: string[] = await Checkbox.prompt({
    message: 'Pick an custom option for the dependency importMap',
    options: [
      { name: 'Preffix', value: 'preffix' },
      { name: 'Suffix', value: 'suffix' },
      Checkbox.separator('--------'),
    ],
  });

  for await (const i of custom) {
    if (i == 'preffix') {
      preffix = await Input.prompt(
        `Pass the custom ${colors.underline('preffix')} for the ${dep}`,
      );
    } else if (i == 'suffix') {
      suffix = await Input.prompt(
        `Pass the custom ${colors.underline('suffix')} for the ${dep}`,
      );
    } else {
      LOGGER.warn(
        `None custom preffix please use the normal ways by ${
          colors.bold('--esm, --std or non flags')
        }\n${colors.yellow(colors.underline('Exiting...'))}`,
      );
      Deno.exit(2);
    }
  }

  // magic for the installation
  switch (register) {
    case 'denox': {
      const modules = appendModuleToDpm(depsName);
      for (const i of modules) {
        const pkg = i.replace('https://deno.land/x', '').split('/');
        const version = await getTheVersionOfDep(pkg[1], 'https://deno.land/x');
        if (version == '') {
          imports[
            `${preffix}${pkg[1]}${suffix}`
          ] = i;
        } else {
          imports[
            `${preffix}${pkg[1]}${suffix}`
          ] = `https://deno.land/x/${pkg[1]}@${version}/`;
        }
        if (version == '') {
          deps[
            `${preffix}${pkg[1]}${suffix}`
          ] = 'none';
        } else {
          deps[
            `${preffix}${pkg[1]}${suffix}`
          ] = `${version}`;
        }
      }
      break;
    }
    case 'denostd': {
      await appendStdToFile(depsName).then((f) => {
        for (const i of f) {
          const pkg = i.split('/');
          imports[`${preffix}${pkg[5]}${suffix}`] = i;
          deps[`${preffix}${pkg[5]}${suffix}`] = i.split('@')[1].replace(
            /[^\d.-]/g,
            '',
          );
        }
      });
      break;
    }
    case 'esm': {
      await esmGetVersion(depsName).then((f) => {
        for (const i of f) {
          const pkg = i.replace(' ', '').split('/');
          imports[`${preffix}${pkg[3].split('@')[0]}${suffix}`] = `${
            i.replace(' ', '')
          }/`;
          deps[`${preffix}${pkg[3].split('@')[0]}${suffix}`] = `${
            i.replace(' ', '').split('@')[1]
          }`;
        }
      });
      break;
    }
    case 'custom': {
      const host: string = await Input.prompt('Host base url to use');

      const modules = appendModuleToDpm(depsName, { host: host });
      for (const i of modules) {
        const pkg = i.replace(host, '').split('/');
        const version = await getTheVersionOfDep(pkg[1], host);
        if (version == '') {
          imports[
            `${preffix}${pkg[1]}${suffix}`
          ] = i;
        } else {
          imports[
            `${preffix}${pkg[1]}${suffix}`
          ] = `${host}${pkg[1]}@${version}/`;
        }
        if (version == '') {
          deps[
            `${preffix}${pkg[1]}${suffix}`
          ] = 'none';
        } else {
          deps[
            `${preffix}${pkg[1]}${suffix}`
          ] = `${version}`;
        }
      }
      break;
    }
    default: {
      LOGGER.error('Not valid register!!');
      Deno.exit(2);
    }
  }

  await Deno.writeTextFile(
    BASE_DIRECTORIES.IMPORT_MAPS,
    JSON.stringify(data, null, '  '),
  );
  await Deno.writeTextFile(
    BASE_DIRECTORIES.DPM_FILE,
    JSON.stringify(dpm, null, '  '),
  );

  LOGGER.info(
    `Successfully installed ${
      colors.bold(depsName.join(', '))
    } into ${NAME_DIRECTORIES.IMPORT_MAPS} and in the ${NAME_DIRECTORIES.DPM_FILE}`,
  );
}

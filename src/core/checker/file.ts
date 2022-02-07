// Copyright © 2022 Dpm Land. All Rights Reserved.

import { importsType } from 'checker/types/importType.ts';
import { dependencyType } from 'checker/types/dependencyType.ts';
import { LOGGER } from 'mods/logger.ts';
import { NAME_DIRECTORIES } from 'mods/dirs.ts';

async function readJson(filename: string) {
  const data = await Deno.readTextFile(filename);
  return JSON.parse(data);
}

export async function readDependencies(
  filename: string,
): Promise<dependencyType[]> {
  try {
    const fileContent = await readJson(filename) as importsType;
    checkIfVersion(fileContent.imports);
    return extractDependencyAndVersion(fileContent.imports);
  } catch (_err) {
    LOGGER.error('Cant read imports file !');
    Deno.exit(2);
  }
}

function checkIfVersion(imports: Record<string, string>) {
  for (const [_, v] of Object.entries(imports)) {
    if (!(v.includes('@'))) {
      LOGGER.error(
        `Version not provided! check the ${NAME_DIRECTORIES.IMPORT_MAPS} and add the versions`,
      );
      Deno.exit(2);
    }
  }
}

function extractDependencyAndVersion(
  imports: Record<string, string>,
): dependencyType[] {
  const result: dependencyType[] = [];
  for (const [key, value] of Object.entries(imports)) {
    const substr = value.substring(value.indexOf('@') + 1);
    const exactVersion = (substr.indexOf('/') > -1)
      ? substr.substring(0, substr.indexOf('/'))
      : substr;
    const exactName = (key.indexOf('/') > -1)
      ? key.substring(0, key.lastIndexOf('/'))
      : key;
    const moduleUrl = value.substring(0, value.lastIndexOf('@'));
    const moduleName = moduleUrl.slice(moduleUrl.lastIndexOf('/') + 1);
    if (exactName && moduleName && value && exactVersion) {
      result.push({
        name: exactName,
        module: moduleName,
        url: value,
        version: exactVersion,
      });
    } else {
      LOGGER.warn(
        `Could not find all information about module ${value}, Skipping module.`,
      );
    }
  }
  return result;
}

// Copyright © 2022 Dpm Land. All Rights Reserved.

import { readDependencies } from 'core/checker/file.ts';
import { addLatestVersions } from 'core/checker/version.ts';

export async function checkVersion(file: string) {
  let dependencies = await readDependencies(file);
  if (dependencies) {
    dependencies = await addLatestVersions(dependencies);
  }
  console.table(dependencies);
}

export interface NewObject {
  [key: string]: string;
}

export async function writeNewVersions(file: string) {
  let deps = await readDependencies(file);
  if (deps) {
    deps = await addLatestVersions(deps);
  }
  const obj: NewObject = {};
  for (const i of deps) {
    i.latest = (typeof i.latest == 'undefined' || i.latest == null)
      ? i.version
      : i.latest;
    obj[`${i.name}`] = i.url.replace(i.version, i.latest);
  }
  return obj;
}

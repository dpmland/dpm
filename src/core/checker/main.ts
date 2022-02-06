// Copyright © 2022 Dpm Land. All Rights Reserved.

import { readDependencies } from 'checker/file.ts';
import { addLatestVersions } from 'checker/version.ts';

export async function checkVersion(file: string) {
  let dependencies = await readDependencies(file);
  if (dependencies) {
    dependencies = await addLatestVersions(dependencies);
  }
  console.table(dependencies);
}

// Copyright © 2024 Dpm Land. All Rights Reserved.

import { dependencyType } from 'checker/types/dependencyType.ts';
import { httpClient } from 'mods/http.ts';

export async function addLatestVersions(
  dependencies: dependencyType[],
): Promise<dependencyType[]> {
  return await Promise.all(
    dependencies.map(async (dependency: dependencyType) => {
      const url =
        `https://cdn.deno.land/${dependency.module}/meta/versions.json`;
      return await getVersionFromUrl(dependency, url);
    }),
  );
}

async function getVersionFromUrl(
  dependency: dependencyType,
  url: string,
): Promise<dependencyType> {
  const versionsList = await httpClient(url);
  if (versionsList) {
    dependency.latest = versionsList.latest;
    dependency.upToDate = versionsList.latest === dependency.version;
  } else {
    dependency.latest = 'not found';
  }
  return dependency;
}

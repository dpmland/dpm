// Copyright © 2022 Dpm Land. All Rights Reserved.

export type dependencyType = {
  name: string;
  module: string;
  version: string;
  url: string;
  latest?: string;
  upToDate?: boolean;
};

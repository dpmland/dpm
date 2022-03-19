// Copyright © 2022 Dpm Land. All Rights Reserved.

import Kia from 'https://deno.land/x/kia@0.4.1b/mod.ts';

export const Installing = new Kia({
  text: 'Installing..',
  color: 'cyan',
});

export const Deleting = new Kia({
  text: 'Deleting...',
  color: 'red',
});

export const Updating = new Kia({
  text: 'Updating...',
  color: 'green',
});

export const Downloading = new Kia({
  text: 'Downloading...',
  color: 'magenta',
});

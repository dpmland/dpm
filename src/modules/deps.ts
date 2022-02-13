// Copyright © 2022 Dpm Land. All Rights Reserved.

// Export the draco deps
export { dracoFiles, dracoInfo } from 'https://deno.land/x/draco@0.1.3/mod.ts';

// Export the join util
export { join } from 'https://deno.land/std@0.125.0/path/mod.ts';

// Export the base name util
export {
  basename,
  dirname,
  extname,
} from 'https://deno.land/std@0.125.0/path/mod.ts';

// Ensure exists file for the folder support!
export { ensureDir, ensureFile } from 'https://deno.land/std@0.125.0/fs/mod.ts';

// Tables for the authors
export { table } from 'https://deno.land/x/minitable@v1.0/mod.ts';

// Charmd for the documentation
export { renderMarkdown } from 'https://deno.land/x/charmd@v0.0.1/mod.ts';

// Opener for the urls
export { open } from 'https://deno.land/x/open@v0.0.5/index.ts';

// Version Checker Tool
export { soxa } from 'https://deno.land/x/soxa@1.4/mod.ts';

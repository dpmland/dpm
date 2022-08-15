// Copyright © 2022 Dpm Land. All Rights Reserved.

// Export the draco deps
export { dracoFiles, dracoInfo } from 'https://deno.land/x/draco@0.1.3/mod.ts';

// Export the filePaths Utils util
export {
  basename,
  dirname,
  extname,
  join,
} from 'https://deno.land/std@0.151.0/path/mod.ts';

// Ensure exists file for the folder support!
export {
  copy,
  ensureDir,
  ensureFile,
  walk,
} from 'https://deno.land/std@0.151.0/fs/mod.ts';

// Tables for help!
export { Table } from 'https://deno.land/x/cliffy@v0.24.3/mod.ts';

// Input module!
export {
  Confirm,
  Input,
  Number,
  prompt,
} from 'https://deno.land/x/cliffy@v0.24.3/prompt/mod.ts';

// Charmd for the documentation
export { renderMarkdown } from 'https://deno.land/x/charmd@v0.0.2/mod.ts';

// Opener for the urls
export { open } from 'https://deno.land/x/open@v0.0.5/index.ts';

// Version Checker Tool
export { soxa } from 'https://deno.land/x/soxa@1.4/mod.ts';

// Cliffy cli!
// BUG: Dont change this version because have very bad breaking changes in the new CLI version!
export {
  Command,
  CompletionsCommand,
} from 'https://deno.land/x/cliffy@v0.22.2/command/mod.ts';

// Emoji!
export * as emoji from 'https://deno.land/x/emoji@0.1.2/mod.ts';

// Colors!
export * as colors from 'https://deno.land/std@0.151.0/fmt/colors.ts';

// Add the JSON Colorizer for beautifull out!
export * as jsonColorize from 'https://deno.land/x/json_colorize@0.1.0/mod.ts';

// Add the parse arguments deps
export { parse } from 'https://deno.land/std@0.151.0/flags/mod.ts';

// Add the node process
export * as node from 'https://deno.land/std@0.151.0/node/process.ts';

// Add the sprintf module
export * as fmt from 'https://deno.land/std@0.151.0/fmt/printf.ts';

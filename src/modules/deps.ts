// Copyright © 2022 Dpm Land. All Rights Reserved.

/**
 * This is all DPM LAND Dependencies
 */
export { dracoFiles, dracoInfo } from 'https://deno.land/x/draco@0.1.3/mod.ts';
export * as jsonColorize from 'https://deno.land/x/json_colorize@0.1.0/mod.ts';

/**
 * This is all STD Deno Dependencies
 */

// Filepaths operations supports
export {
  basename,
  dirname,
  extname,
  join,
} from 'https://deno.land/std@0.151.0/path/mod.ts';

// FS Operation supports
export {
  copy,
  ensureDir,
  ensureFile,
  walk,
} from 'https://deno.land/std@0.151.0/fs/mod.ts';

// Parse flags for the DPX
export { parse } from 'https://deno.land/std@0.151.0/flags/mod.ts';

// Node Process support
export * as node from 'https://deno.land/std@0.151.0/node/process.ts';

// FMT for generate the command!
export * as fmt from 'https://deno.land/std@0.151.0/fmt/printf.ts';

// Colors for the prints out
export * as colors from 'https://deno.land/std@0.151.0/fmt/colors.ts';

/**
 * This is all CLIFFY Dependencies thanks for make this amazing module!
 */

// Input module!
export {
  Confirm,
  Input,
  Number,
  prompt,
} from 'https://deno.land/x/cliffy@v0.24.3/prompt/mod.ts';

// BUG: Dont change this version because have very bad breaking changes in the new CLI version!
export {
  Command,
  CompletionsCommand,
} from 'https://deno.land/x/cliffy@v0.22.2/command/mod.ts';

// Tables for help!
export { Table } from 'https://deno.land/x/cliffy@v0.24.3/mod.ts';

/**
 * This is all third party modules!
 */

// Print MD files to Term
export { renderMarkdown } from 'https://deno.land/x/charmd@v0.0.2/mod.ts';

// Open the URLS!
export { open } from 'https://deno.land/x/open@v0.0.5/index.ts';

// Http Client
export { soxa } from 'https://deno.land/x/soxa@1.4/mod.ts';

// Emoji!
export * as emoji from 'https://deno.land/x/emoji@0.1.2/mod.ts';

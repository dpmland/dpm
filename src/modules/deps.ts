// Copyright © 2022 Dpm Land. All Rights Reserved.

/**
 * This is all DPM LAND Dependencies
 */
export { dracoFiles, dracoInfo } from 'https://deno.land/x/draco@0.1.3/mod.ts';
export * as jsonColorize from 'https://deno.land/x/json_colorize@0.1.0/mod.ts';

/**
 * The new way to get home directory
 */
export * as directory from 'https://deno.land/x/dir@1.5.1/mod.ts';
/**
 * This is all STD Deno Dependencies
 */

// Filepaths operations supports
export {
  basename,
  dirname,
  extname,
  join,
} from 'https://deno.land/std@0.195.0/path/mod.ts';

// FS Operation supports
export {
  copy,
  ensureDir,
  ensureFile,
  walk,
} from 'https://deno.land/std@0.195.0/fs/mod.ts';

// Parse flags for the DPX
export { parse } from 'https://deno.land/std@0.195.0/flags/mod.ts';

// Node Process support
export * as node from 'https://deno.land/std@0.158.0/node/process.ts';

// FMT for generate the command!
export * as fmt from 'https://deno.land/std@0.195.0/fmt/printf.ts';

// Colors for the prints out
export * as colors from 'https://deno.land/std@0.195.0/fmt/colors.ts';

/**
 * This is all CLIFFY Dependencies thanks for make this amazing module!
 */

// Input module!
export {
  Checkbox,
  Confirm,
  Input,
  List,
  Number,
  prompt,
  Select,
} from 'https://deno.land/x/cliffy@v1.0.0-rc.2/prompt/mod.ts';

export {
  Command,
  CompletionsCommand,
  HelpCommand,
} from 'https://deno.land/x/cliffy@v1.0.0-rc.2/command/mod.ts';

// Tables for help!
export { Table } from 'https://deno.land/x/cliffy@v1.0.0-rc.2/table/mod.ts';

/**
 * This is all third party modules!
 */

// Print MD files to Term
export { renderMarkdown } from 'https://deno.land/x/charmd@v0.0.2/mod.ts';

// Open the URLS!
export { open } from 'https://deno.land/x/open@v0.0.6/index.ts';

// Unknown util
export * as UtilUnknown from 'https://deno.land/x/unknownutil@v2.0.0/mod.ts';

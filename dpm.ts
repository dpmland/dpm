// Copyright © 2022 Dpm Land. All Rights Reserved.

import {
  Command,
  CompletionsCommand,
  DenoLandProvider,
  GithubProvider,
  UpgradeCommand,
} from 'mods/deps.ts';
import { DESCRIPTION, VERSION } from 'mods/info.ts';
import { AboutCommand } from 'cmd/about.ts';
import { DocsCommand } from 'cmd/docs.ts';
import { InitCommand } from 'cmd/init.ts';
import { InstallCommand } from 'cmd/install.ts';
import { ToolsCommand } from 'cmd/tools.ts';
import { UninstallCommand } from 'cmd/uninstall.ts';
import { UpdateCommand } from 'cmd/update.ts';

// Make the CLI!
await new Command()
  .name('dpm')
  .version(`${VERSION.substring(1)}`)
  .description(DESCRIPTION)
  .command('about', new AboutCommand())
  .command('docs', new DocsCommand())
  .command('init', new InitCommand())
  .command('uninstall', new UninstallCommand())
  .command('install', new InstallCommand())
  .command('tools', new ToolsCommand())
  .command('update', new UpdateCommand())
  .command(
    'upgrade',
    new UpgradeCommand({
      provider: [
        new DenoLandProvider({ name: 'dpm' }),
        new GithubProvider({ repository: 'dpmland/dpm' }),
      ],
    }),
  )
  .command('completions', new CompletionsCommand())
  .parse(Deno.args);

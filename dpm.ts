// Copyright © 2022 Dpm Land. All Rights Reserved.

import { Command, CompletionsCommand } from 'mods/deps.ts';
import { DESCRIPTION, VERSION } from 'mods/info.ts';
import { AboutCommand } from 'cmd/about.ts';
import { DocsCommand } from 'cmd/docs.ts';
import { InitCommand } from 'cmd/init.ts';
import { InstallCommand } from 'cmd/install.ts';
import { ToolsCommand } from 'cmd/tools.ts';
import { UninstallCommand } from 'cmd/uninstall.ts';
import { UpdateCommand } from 'cmd/update.ts';
import { TaskCommand } from 'cmd/task.ts';
import { UpgradeCommand } from 'cmd/upgrade.ts';
import { ExecCommand } from 'cmd/exec.ts';
import { TemplateCommand } from 'cmd/template.ts';
import { PublishCommand } from 'cmd/publish.ts';

// Make the CLI!
await new Command()
  .name('dpm')
  .example(
    'Start a new Project',
    'mkdir my_project && cd my_project && dpm init -A',
  )
  .example('Install a dependency', 'dpm install draco dlog2')
  .example('Uninstall a dependency', 'dpm uninstall draco dlog2')
  .version(`${VERSION.substring(1)}`)
  .description(DESCRIPTION)
  .command('about', new AboutCommand())
  .command('docs', new DocsCommand())
  .command('init', new InitCommand())
  .command('uninstall', new UninstallCommand())
  .command('install', new InstallCommand())
  .command('tools', new ToolsCommand())
  .command('task', new TaskCommand())
  .command('update', new UpdateCommand())
  .command('template', new TemplateCommand())
  .command(
    'upgrade',
    new UpgradeCommand(),
  )
  .command('exec', new ExecCommand())
  .command('completions', new CompletionsCommand())
  .command('publish', new PublishCommand())
  .parse(Deno.args);

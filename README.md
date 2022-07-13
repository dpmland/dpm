<img src="https://avatars.githubusercontent.com/u/97813425" align="right" alt="Dpm Logo" width="100">

## Dpm - CLI :sauropod:

[![Discord](https://img.shields.io/discord/932381618851692565?label=Discord&logo=discord&logoColor=white)](https://discord.gg/Um27YPJKud)
[![Twitter](https://img.shields.io/twitter/follow/dpm_land?label=Dpm%20Land&style=social)](https://twitter.com/intent/follow?screen_name=dpm_land)
[![GitHub license](https://img.shields.io/github/license/dpmland/cli?label=License)](./LICENSE)
![GitHub Workflow](https://img.shields.io/github/workflow/status/dpmland/cli/CI)

Dpm `Deno Package Manager` is a _simple_, _modern_ and _easy way_ to **manage
the Deno modules and dependencies** that help to write and manage the Deno
modules and in general any TypeScript or JavaScript code

## Features :computer:

- Build all with TypeScript
- `deno lint` and `deno fmt` commands support
- Config generator for `deno lint`, `deno fmt` and `deno test`
- Manage all in a `dpm.json` file with the same syntax of the `package.json` and
  more features
- Generate all dependencies from a `import_map.json` file
- Offline documentation manager
- Tools helper manager: install all tools for a better Deno development
- Update the dependencies manager
- Information about some directories and versions
- Powerful logger system

## Installation :rocket:

**Warning** Dpm is under development process and does not provide full
documentation or complete features. Use at your own risk and expect breaking
changes.

```sh
deno run -A --unstable https://raw.githubusercontent.com/dpmland/dpm/dev/install.ts canary
```

> Recommendation for Windows with the EMOJIS :alien:

Well I found a bug with emojis in the CLI and tried to find a solution and found
this comment about this issue and what causes this issue.

```
There is an issue with Deno.stdout.write which doesn't handle unicode characters well. There is already an deno issue denoland/deno#6001.
But i found a workaourund here denoland/deno#6131 (comment).
You have to enable utf8 character encoding in windows than it should work.
```

_Source [Here](https://github.com/c4spar/deno-cliffy/issues/113)_

And the solution proposed is added this to the top of the `profile.ps1` file can
be accessibly with this command `notepad $PROFILE` on Powershell!

```ps1
[Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8
```

# Usage :alien:

## Start a basic Deno project :mega:

For start a Deno project with all files you only need make this:

```sh
# Start a new folder
$ mkdir my_project && cd my_project

# Start a all fully featured Dpm project
$ dpm init -A

# Answer the questions and done!
```

If you just need to start `dpm_imports.json` and `dpm.json` files without
questions you need to run:

```sh
# Start a new folder!
$ mkdir my_project && cd my_project

# Start only necessary files project
$ dpm init -y
```

If you want to restart or only write one file you need to run

```sh
# Start a new folder
$ mkdir my_project && cd my_project

# Start only one file
$ dpm init -f readme

## Note:
## Check the files avaliable on dpm docs init.actions
## for start a file like: readme, deno-config or eggs
## You need start the dpm.json file
```

## Install dependencies with Dpm :package:

Dpm does not download files on the computer, only write the correct url at
`dpm_imports.json` and make an experience of development like **NodeJS** with
**NPM or Yarn**

For install dependencies from the [deno.land/x](https://deno.land/x/) registry
you only need to write:

```sh
$ dpm install draco dlog2
```

For install dependencies from the [Deno std](https://deno.land/std) registry you
only need to use this:

```sh
$ dpm install flag async http path --std

## You need put the name of the library and the flag -s or --std
```

For install dependencies from other host or registries you need to run:

```sh
$ dpm install example_dep --host nest.land
```

## Use the dependencies with Dpm :package:

To use the modules installed at `dpm_imports.json`, you need to use like Node:

```ts
import { serve } from 'http/server.ts';

serve((req) => new Response('Hello World\n'));
```

> To configure DPM to work with code editors, you need to download the plugin
> for your editor and fill the `deno.config` field at `./deno.json` and the
> `deno.importMap` field at `./dpm_imports.json`.

## Uninstall dependencies with Dpm :star2:

Dpm does not delete any libraries from your computer, it just deletes the
`dpm_imports.json` file

To uninstall all dependencies at `dpm_imports.json` you need to run:

```sh
$ dpm uninstall -A
```

For uninstall just one specific dependency you need to run:

```sh
$ dpm uninstall draco dlog2
```

## Automate commands with [Deno tasks](https://deno.land/manual/tools/task_runner) :robot:

Many apps need some commands, and you do not like write this many times this
command and here are the amazing and incredible **Deno tasks** well with this
you can automate many things and are integrated with Deno but how can make this
amazing tool better here are the _task command_ on Dpm.

To add a task to the files well you only need to run:

```sh
$ dpm task -n
```

And this adds the task at `deno.json` and `dpm.json`, well but if I add a new
task at `dpm.json` How can update this? You only need to run this command:

```sh
$ dpm task -u
```

You want to see what commands you have, and this files here are the list in a
beautiful table.

```sh
$ dpm task -l deno # To see the deno.json file
$ dpm task -l dpm # To see the dpm.json file
$ dpm task -l all # To see the dpm and deno.json files
```

> Here are all basic features of Dpm if you want to :warning: but exists more
> features you can check Dpm doc help :white_check_mark:

## Contribution Guides :books:

Thanks for want to help to this project, to contribute you can check the
[contributing file](./CONTRIBUTING.md)

---

Made with :heart: in :earth_americas:

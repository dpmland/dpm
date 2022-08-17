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

Stable Version:

```sh
deno run -A --unstable https://dpmland.deno.dev/install stable
```

Development Version can check the features roadmap
[here](https://github.com/dpmland/dpm/pull/7):

```sh
deno run -A --unstable https://dpmland.deno.dev/install canary
```

> Recommendation for Windows with the EMOJIS :alien:

Well I found a bug with emojis in the CLI and tried to find a solution and found
this comment about this issue and what causes this issue.

```
There is an issue with Deno.stdout.write which doesn't handle unicode characters well. There is already an deno issue denoland/deno#6001.
But i found a workaround here denoland/deno#6131 (comment).
You have to enable utf8 character encoding in windows than it should work.
```

_Source [Here](https://github.com/c4spar/deno-cliffy/issues/113)_

And the solution proposed is added this to the top of the `profile.ps1` file can
be accessibly with this command `notepad $PROFILE` on Powershell!

```ps1
[Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8
```

# Basic usage :nerd_face:

Well is very very simple make a project with DPM help and here we are going to
make a basic http server with DPM.

1. For start the DPM files you can run this:

```sh
# Here exists maaaaaany ways but here explain the ways very simple

# -A or --all -> Write all files what support DPM printing the content with  ** many colors out :) **
# -y or --yes -> Write only the DPM File, DPM Imports and the Deno file only basic setup
# -M or --minimalist -> Write all files what support DPM but without print the content ** no colors out :( **

# We start only with the necessary files..
dpm init -y
```

2. After this is necessary install the dependencies for make 2 servers with
   third party dependencies and with the std dependencies

```sh
# For the third party server we are going to use oak for install this you need run:

dpm install oak # Done!

# For the std dependencies only need the http module and for this you need only run:

dpm install --std http # Don't forget the --std flag
```

3. Done the setup for the dependencies well this repository maybe need a task
   for start this

```jsonc
// Well in our dpm.json we need add this...
{
  "$schema": "https://dpmland.deno.dev/schema",
  "name": "dpm-tutorial",
  "version": "0.1.0",
  "description": "A example dpm package",
  "author": "A cool coder human",
  "license": "ISC",
  "main": "mod.ts",
  "scripts": {
    "test": "deno test -A --unstable",
    "fmt": "deno fmt -c deno.json",
    "lint": "deno lint -c deno.json",
    "fmt:check": "deno fmt -c deno.json --check && deno lint -c deno.json",
    // The start scripts for the oak and http files
    "start:oak": "deno run -A oak.ts",
    "start:http": "deno run -A http.ts"
  },
  "dependencies": {
    "oak/": "v10.6.0",
    "http/": "0.152.0"
  }
}
```

After this is necessary run the update command for the tasks:

```sh
# With this command you can merge the dpm.json and deno.json tasks in one.
dpm task -u
```

4. How can make the editor works with the module completions?

Well now your editor not works with completions for DPM and if you add the code
in the next step you see many errors in your editor but this is easy to solve.

```sh
# Many editors are supported with the auto config generator with this command
dpm init -f editor
# If your editor is not found you can run
dpm init -f editor-cfg
# This is the content of the file you only need copy the content to the deno-lsp config in your editor :)
```

5. Well with this need the code for start this servers:

- The Oak Code.

```ts
// oak.ts file
import { Application } from '"oak/mod.ts';
const app = new Application();

app.use((ctx) => {
  ctx.response.body = 'Hello DPM!';
});

await app.listen({ port: 8000 });
```

With this the server are ready to run you only need run `deno task start:oak`
and done the setup with DPM is very simple and fast :smiley:

- The Http Code.

```ts
import { serve } from 'http/server.ts';
serve((_req) => new Response('Hello DPM!'), { port: 8000 });
```

With this the server are ready to run you only need run `deno task start:http`
and done the setup with DPM is very simple and fast :smiley:

# Commands :robot:

> For see all documentation of DPM with a pretty UI you can go to
> [here](https://dpmland.github.io)

- **[about || me](https://dpmland.github.io/commands/about/)**: Here you can
  found the information and some tools for learn more about dpm.

- **[docs || doc](https://dpmland.github.io/commands/docs/)**: Here you can get
  the documentation and download, clean and update the docs.

- **init || create**: Here you can generate some files for work with dpm and
  tools for a better development with Deno.

- **uninstall || clean**: Here you can uninstall the dependencies from the
  _dpm_imports.json_ file and if you want remove one or many of this deps can
  you do it!

- **install || add**: If you want use external packages and dependencies can you
  use this tool!

- **[tools](https://dpmland.github.io/commands/tools/)**: Here you can install
  tools for a better development with deno and for complement the dpm cli.

- **[task || run](https://dpmland.github.io/commands/task/)**: With this command
  you can run scripts like `npm scripts` you can define this in the `dpm.json`
  file.

- **update**: Here you can check if the file are updated `dpm_imports.json`
  dependencies and the new version available

- **upgrade**: Upgrade dpm executable to latest or given version.

- **exec || x**: With this tool you can run Deno X modules without installation.

- **template || tmpl**: Well you need a start a project and need a template here
  are all templates!!

- **publish**: For publish your package to the world you can run this!

- **[completions](https://dpmland.github.io/commands/completions)**: Generate
  shell completions

## Contribution Guides :books:

Thanks for want to help to this project, to contribute you can check the
[contributing file](./CONTRIBUTING.md)

---

Made with :heart: in :earth_americas:

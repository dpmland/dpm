<img src="https://avatars.githubusercontent.com/u/97813425" align="right" alt="Dpm Logo" width="100">

## Dpm - CLI :sauropod:

[![Discord](https://img.shields.io/discord/932381618851692565?label=Discord&logo=discord&logoColor=white)](https://discord.gg/Um27YPJKud)
[![Twitter](https://img.shields.io/twitter/follow/dpm_land?label=Dpm%20Land&style=social)](https://twitter.com/intent/follow?screen_name=dpm_land)
[![GitHub license](https://img.shields.io/github/license/dpmland/cli?label=License)](./LICENSE)
![Github Workflow](https://img.shields.io/github/workflow/status/dpmland/cli/CI)

Dpm `Deno Package Manager` is a _simple_, _modern_ and _easy way_ to **manage
the Deno Modules and dependencies** that help to write and manage the deno
libraries and code

## Features :computer:

- Build with 100% Typescript
- Deno Lint, Format command support
- Config generator for _deno lint_, _deno fmt_, _deno test_
- Manage all in a `dpm.json` file with the same syntax of the `package.json` and
  more features
- Generate all dependencies from a `import_map.json` file
- Offline documentation manager
- Tools helper manager, install all tools for a better Deno Development
- Update the dependencies manager!
- Information about some directories and versions!
- Powerfull Logger sistem!
- Open Source!

## Installation :rocket:

> Unstable version :warning:

If you want test dpm in the development version **NOT DOCUMENTATION PROVIDED**
and **NO COMPLETE FEATURES** can you install with:

> Stable not ultimate features! :alien:

**Only the CLI Installation**: :star:

```sh
deno install -Afn dpm --unstable --import-map=https://deno.land/x/dpm/import_map.json https://deno.land/x/dpm/cli.ts
```

**Complete installation**: :fire:

```sh
deno install -Afn dpm --unstable --import-map=https://deno.land/x/dpm/import_map.json https://deno.land/x/dpm/cli.ts && dpm doc -d && dpm tools install
```

> Canary ( Ultimate features ) :bird:

**Only the CLI Installation:** :star:

```
deno install -qAf --unstable --import-map=https://denopkg.com/dpmland/dpm@dev/import_map.json https://denopkg.com/dpmland/dpm@dev/dpm.ts
```

**Complete installation:** :fire:

```
deno install -qAf --unstable --import-map=https://denopkg.com/dpmland/dpm@dev/import_map.json https://denopkg.com/dpmland/dpm@dev/dpm.ts && dpm doc -d && dpm tools install
```

# Usage :alien:

~~Well this is very dificult to use~~, no is a very usefull and easy to use tool
for manage and write new Deno Projects actually is all necessary features done
but is going some features now!

## Start a basic Deno Project! :mega:

For start a Deno project with all files you only need make this!

```sh
# Start a new folder!
mkdir my_project && cd my_project
# Start a all fully featured Dpm Project!
dpm init -A
# Answer the questions and Done!
```

If you need start only the _dpm_imports.json_ file and the _dpm.json_ file
without questions you need only run:

```sh
# Start a new folder!
mkdir my_project && cd my_project
# Start only necessary files project
dpm init -y
```

If you want restart or write only one file you need run

```sh
# Start a new folder!
mkdir my_project && cd my_project
# Start only one file!
dpm init -f readme
## Note:
## Check the files avaliable on dpm docs init.actions
## FOR START A FILE LIKE: readme, deno-config or eggs
## You need start the dpm.json file!
```

## Install dependencies with DPM :package:

DPM does not download files on the computer, only write the correct url on the
_dpm_imports.json_ file and make a experience of development like **NodeJS** and
**NPM or Yarn**

For install dependencies from the [deno.land/x](https://deno.land/x/) register
you need only write:

```sh
dpm install draco dlog2
```

For install dependencies from the [deno std](https://deno.land/std) register you
need only use this!

```sh
dpm install flag async http path --std
## You need put the name of the library and the flag -s or --std
```

For install dependencies from other host you need run:

```sh
dpm install example_dep --host nest.land
```

## Uninstall dependencies with DPM :star2:

DPM doesn't delete any libraries from your computer, it just deletes the
_dpm_imports.json_ file!

For uninstall all dependencies from the _dpm_imports.json_ you need run:

```sh
dpm uninstall -A
```

For uninstall only one specific dependency you need run:

```sh
dpm uninstall draco dlog2
```

> Here are all basic features of dpm if you want :warning: but exists more
> features you can check dpm doc help :white_check_mark:

## Contribution Guides :books:

Thanks for want help to this project for contribute you can check the
[contributing file](./CONTRIBUTING.md)

---

Made with :heart: in :earth_americas:

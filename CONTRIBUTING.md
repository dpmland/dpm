## Steps to contribute

Before the contribution you need check the file structure on the
[Readme Source File](./src/README.md) and follow this steps

1. Make a Fork to this repository
2. Make a branch with the feature to add
3. Use the conventional commits guide
   [more information here](https://www.conventionalcommits.org/en/v1.0.0/)
4. Make a pull request with an explanation what you change or features
5. Review your pull request :shipit:
6. Merge the pull request or request changes
7. Done! :smiley:

## Requirements

- If you add a new file to the file structure ensure add to the tree on the
  [Readme Source File](./src/README.md) and add this con the header on the file:

```
// Copyright © 2024 Dpm Land. All Rights Reserved.
```

- Ensure check the lint and the format before the commit with this command:

```
deno task fmt
```

- Use underscores, not dashes in filenames example:

```
example_file.ts // GOOD
example-file.ts // BAD
```

- Inclusive code:

Please follow the guidelines for
[inclusive code](https://chromium.googlesource.com/chromium/src/+/master/styleguide/inclusive_code.md)

- For end any readme file if you add into the src or the root folder add this
  lines

```markdown
---

Made with :heart: in :earth_americas:
```

And done thanks for contribute

## Development Deno Package Manager Tool!

Well for more easy and fast development I wrote [ddpm](./dev.ts) here you can
check the code is a simple but more fast way to make some tasks and check if
ready to contribute for install run!

```sh
deno install -A -f -n ddpm --unstable --import-map=import_map.json dev.ts ## LOCALLY
```

For remote usage run:

```sh
## REMOTE
deno install -A -f -n ddpm --unstable --import-map=https://denopkg.com/dpmland/dpm@dev/import_map.json https://denopkg.com/dpmland/dpm@dev/dev.ts
```

Commands available:

- Clean: Remove the unused files and clean after the upload!
- Upload: Check the lint and the format on the current directory!

## Roadmap :sparkles:

- [x] Add the main cli
- [x] Create the init command and create the `dpm.json` file
- [x] Clean the dependencies ( all and one by one )
- [x] Documentation offline
- [x] About cli and directories help
- [x] Format internal json files
- [x] Add the script command support
- [x] Add the `format, format check, lint` commands
- [x] Tools installation for deno development
- [x] Add the import modules to the dependencies into import field.
- [x] Create the `deno.json` config generator
- [x] Add the import map generator
- [x] Add the `eggs.json` file generator
- [x] Add the aliases for run a deno app
- [x] Template engine for use many starter kits more easy!
- [x] Documentation markdown complete!
- [x] Add the check upgrade and the upgrade command for dpm
- [x] Add the `README.md` and data generator.
- [x] Add the `npx` clone for Deno with [land](https://github.com/ije/land) #8
- [x] Add the license generator file: add the automaticall license download from
      the `dpm.json` file. #9
- [x] Add the support for the [esm.sh](https://esm.sh) dependencies for a
      automaticall installation like: `dpm install --esm react` #10
- [x] Add the `dpm checkupgrade` for show the updates and `dpm upgrade` for
      write the new versions! #13
- [x] Add the template manager like: `npx create react-app` and replace with a
      `dpm template fresh-app` #15
- [x] Add the `dpm publish` for the dependencies! #12
- [x] Add the editor config generator file: add the automaticall config
      generator for editors `vscode, vim, neovim` #11
- [x] Migrate to other prompt module for a more beautifull out 🖌️

---

Made with :heart: in :earth_americas:

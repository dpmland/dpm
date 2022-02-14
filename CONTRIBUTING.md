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
// Copyright © 2022 Dpm Land. All Rights Reserved.
```

- Ensure check the lint and the format before the commit with this command:

```
deno fmt -c deno.json
deno lint -c deno.json
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

Commands avaliable:

- Clean: Remove the unused files and clean after the upload!
- Upload: Check the lint and the format on the current directory!

---

Made with :heart: in :earth_americas:

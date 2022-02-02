## The Dpm Source Code

Here you found the source code of Dpm.

### File structure

```
├──  core ## All logic of the  internal file
│  ├──  files ## The files operations like read write files
│  │  ├── init.ts
│  │  └── read.ts
│  ├──  packages ## For the <<dependencies>> section on the dpm file
│  │  └── add.ts
│  ├──  runner ## Run the commands of the scripts section
│  │  ├── format.ts
│  │  └── main.ts
│  └──  scripts ## Run the build-in commands
│     └── build-in.ts
├──  modules ## The simple modules for the cli like dependencies or the authors file
│  ├── ask.ts
│  ├── authors.ts
│  ├── cli.ts
│  ├── deps.ts
│  ├── dirs.ts
│  └── logger.ts
└── README.md
```

### For the contributors

If you help or contribute to the dpm source you can add to the
[authors file](./modules/authors.ts) for promote you :smiley:

Made with :heart: in :earth_americas:

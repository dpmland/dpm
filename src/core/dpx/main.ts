import { colors, Input, parse, prompt } from 'mods/deps.ts';
import { cache } from 'dpx/cache.ts';
import { LOGGER } from 'mods/logger.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';

type DirEntry = { type: string; path: string };

export interface DpxOptions {
  importMapNames?: string[] | undefined;
  filenameNames?: string[] | undefined;
}

export const denoPermissionFlags = [
  '-A',
  '--allow-all',
  '--allow-env',
  '--allow-ffi',
  '--allow-hrtime',
  '--allow-net',
  '--allow-read',
  '--allow-run',
  '--allow-write',
];

export const supportedModuleExts = [
  '.ts',
  '.tsx',
  '.mts',
  '.js',
  '.jsx',
  '.mjs',
];

export async function RunDPX(
  Arguments: string[] | undefined,
  Options: DpxOptions = {},
) {
  if (typeof Arguments == 'undefined') {
    LOGGER.error('Is necessary a value for run!');
    Deno.exit(2);
  }
  const { _: args, ...options } = parse(
    Arguments.filter((a) => !denoPermissionFlags.includes(a)),
  );

  // Add the Variables of the CLI Names
  Options.filenameNames = (Options.filenameNames?.includes('') ||
      typeof Options.filenameNames == 'undefined')
    ? ['cli', 'main', 'mod']
    : Options.filenameNames;
  Options.importMapNames = (Options.importMapNames?.includes('') ||
      typeof Options.importMapNames == 'undefined')
    ? [
      'import_map.json',
      'import-map.json',
      'importMap.json',
      'importmap.json',
      'import_map.json',
    ]
    : Options.importMapNames;

  // Add the Args Default
  if (args.length == 0) {
    console.log(colors.bold('EXTRACTED AND ADAPTED FROM LAND'));
    console.log(colors.dim('Homepage: '), 'https://deno.land/x/land');
    console.log(colors.dim('Repo: '), 'https://github.com/ije/land');
    console.log(colors.dim('Adapted by: '), 'https://github.com/dpmland/dpm');
    return;
  }

  let [moduleName, version] = args.shift()!.toString().split('@');
  const versionMetaUrl =
    `https://cdn.deno.land/${moduleName}/meta/versions.json`;
  const resp1 = await fetch(versionMetaUrl);
  if (resp1.status === 404 || resp1.status === 403) {
    console.error(`Module "${moduleName}" not found`);
    Deno.exit(1);
  }
  if (resp1.status !== 200) {
    console.error(resp1.statusText + ':', versionMetaUrl);
    Deno.exit(1);
  }

  const { latest, versions } = await resp1.json();
  if (!version) {
    version = latest;
  } else if (!versions.includes(version)) {
    const v = version;
    if (v.startsWith('v')) {
      version = v.slice(1);
    } else {
      version = 'v' + v;
    }
    if (!versions.includes(version)) {
      for (const ver of versions) {
        if (ver.startsWith(v)) {
          version = ver;
          break;
        } else if (v.startsWith('v') && ver.startsWith(v.slice(1))) {
          version = ver;
          break;
        } else if (!v.startsWith('v') && ver.startsWith('v' + v)) {
          version = ver;
          break;
        }
      }
    }
    if (!versions.includes(version)) {
      console.error(`Version "${v}" not found`);
      Deno.exit(1);
    }
    if (version != v) {
      console.log(colors.dim(`Found version ${version}`));
    }
  }

  const { content } = await cache(
    `https://cdn.deno.land/${moduleName}/versions/${version}/meta/meta.json`,
  );
  const { directory_listing } = JSON.parse(new TextDecoder().decode(content));

  let command: string | null = null;
  let importMap: string | null = null;
  for (
    const name of Options.filenameNames.map((name) =>
      supportedModuleExts.map((ext) => `${name}${ext}`)
    ).flat()
  ) {
    if (
      directory_listing.some((entry: DirEntry) =>
        entry.type === 'file' && entry.path === `/${name}`
      )
    ) {
      command = name;
      break;
    }
  }
  for (
    const filename of Options.importMapNames
  ) {
    if (
      directory_listing.some((entry: DirEntry) =>
        entry.type === 'file' && entry.path === `/${filename}`
      )
    ) {
      importMap = filename;
      break;
    }
  }

  if (command === null) {
    console.error(`No command entry file found in ${moduleName}`);
    Deno.exit(1);
  }

  const permissionFlags: string[] = [];
  const denoFlags: string[] = [];
  const appFlags: string[] = [];
  for (const f of Deno.args) {
    if (denoPermissionFlags.includes(f)) {
      permissionFlags.push(f);
    }
  }
  for (const key of Object.keys(options)) {
    const value = options[key];
    const flagKey = (key.length === 1 ? '-' : '--') + key;
    if (flagKey === '--location' && typeof value === 'string') {
      try {
        const url = new URL(value);
        denoFlags.push(`--location=${url.toString()}`);
      } catch (_e) {
        // ignore
      }
    }
    if (value && value !== true) {
      appFlags.push(`${flagKey}=${value}`);
    } else {
      appFlags.push(flagKey);
    }
  }
  if (permissionFlags.length === 0) {
    const permissionsFile = directory_listing.find((entry: DirEntry) =>
      entry.type === 'file' &&
      (entry.path === `/PERMISSIONS` || entry.path === `/PERMISSIONS.txt`)
    );
    if (permissionsFile) {
      const { content } = await cache(
        `https://cdn.deno.land/${moduleName}/versions/${version}/raw${permissionsFile.path}`,
      );
      const text = new TextDecoder().decode(content);
      const list = text.split('\n').map((line) => {
        const value = line.trim();
        return denoPermissionFlags.find((p) =>
          value === p || '--' + value === p
        ) || '';
      }).filter(Boolean);
      permissionFlags.push(...list);
      if (permissionFlags.length > 0) {
        console.log(colors.dim(`DPX Permissions: ${list.join(' ')}`));
      }
    }
  }
  if (permissionFlags.length === 0) {
    permissionFlags.push('--prompt');
  }
  if (!denoFlags.some((f) => f.startsWith('--location='))) {
    denoFlags.push(`--location=http://0.0.0.0`);
  }
  if (importMap !== null) {
    denoFlags.push(
      `--import-map=https://deno.land/x/${moduleName}@${version}/${importMap}`,
    );
  }

  const cmd = [
    BASE_DIRECTORIES.DENO_EXEC,
    'run',
    '--unstable',
    ...denoFlags,
    ...permissionFlags,
    `https://deno.land/x/${moduleName}@${version}/${command}`,
    ...args.map((a: string | number, _: number, _a: (string | number)[]) =>
      a.toString()
    ),
    ...appFlags,
  ];

  console.log(`${colors.dim('$')} ${colors.bold(cmd.join(' '))}`);

  const run = Deno.run({
    cmd: cmd,
    stdin: 'inherit',
    stdout: 'inherit',
    stderr: 'inherit',
  });

  await run.status();
  run.close();
}

export async function GeneratePromptDPX() {
  const answers = await prompt([
    {
      name: 'app',
      message: `App@Version and arguments to run ${
        colors.underline('dpm@0.1.2 --help')
      }`,
      type: Input,
    },
    {
      name: 'name',
      message: `Name of the file to execute ${
        colors.dim(
          '( Default << dpm exec --defaults >> )',
        )
      }`,
      type: Input,
      suggestions: ['cli', 'main', 'mod'],
    },
    {
      name: 'importMap',
      message: `Name of the importMap file to run ${
        colors.dim(
          '( Default << dpm exec --defaults >> )',
        )
      }`,
      type: Input,
      suggestions: [
        'import_map.json',
        'import-map.json',
        'importMap.json',
        'importmap.json',
        'import_map.json',
      ],
    },
  ]);
  return answers;
}

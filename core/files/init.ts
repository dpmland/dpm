import { ask } from 'mods/ask.ts';
import { basename, dracoFiles } from 'mods/deps.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';

export async function GetTheOptionsPrompt() {
  const answers = await ask.prompt([
    {
      name: 'name',
      message: 'Package name',
      type: 'input',
    },
    {
      name: 'version',
      message: 'Version',
      type: 'input',
    },
    {
      name: 'description',
      message: 'Description of the package',
      type: 'input',
    },
    {
      name: 'author',
      message: 'Author',
    },
    {
      name: 'license',
      message: 'License for the app',
    },
    {
      name: 'entry_point',
      message: 'Entry Point or main file',
      type: 'input',
    },
    {
      name: 'test_cmd',
      message: 'Test command for the app',
      type: 'input',
    },
    {
      name: 'fmt_cmd',
      message: 'Formatting command',
    },
    {
      name: 'lint_cmd',
      message: 'Lint command',
    },
  ]);
  return answers;
}

function generateJSONObject(
  input: Record<string, unknown>,
): Record<string, unknown> {
  return {
    name: input.name || basename(dracoFiles.currentDir()),
    version: input.version || '0.1.0',
    description: input.description || 'A example dpm package',
    author: input.author || 'A cool coder human',
    license: input.license || 'ISC',
    main: input.entry_point || 'mod.ts',
    scripts: {
      build_in: {
        test: input.test_cmd || 'deno test -A --unstable',
        fmt: input.fmt_cmd || 'deno fmt -c deno.json',
        lint: input.lint_cmd || 'deno lint -c deno.json',
      },
    },
    dependencies: {},
  };
}

export async function WriteDpmFileJson(input_prompt: Record<string, unknown>) {
  try {
    await Deno.writeTextFile(
      BASE_DIRECTORIES.DPM_FILE,
      JSON.stringify(generateJSONObject(input_prompt), null, '\t'),
    );
  } catch (e) {
    LOGGER.error(e);
    Deno.exit(1);
  }
  LOGGER.info('Writed succesfully the dpm.json file');
}

export async function WriteImportMapJson() {
  try {
    await Deno.writeTextFile(
      BASE_DIRECTORIES.IMPORT_MAPS,
      JSON.stringify(
        {
          imports: {},
        },
        null,
        '\t',
      ),
    );
  } catch (e) {
    LOGGER.error(e.message);
    Deno.exit(1);
  }
  LOGGER.info('Writed succesfully import_map.json file');
}

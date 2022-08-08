// Copyright © 2022 Dpm Land. All Rights Reserved.

import { colors, copy, join } from 'mods/deps.ts';
import { BASE_DIRECTORIES } from 'mods/dirs.ts';
import { LOGGER } from 'mods/logger.ts';
import { ask } from 'mods/ask.ts';

export async function useTemplate(template: string[]) {
  for await (const e of Deno.readDir(`${BASE_DIRECTORIES.TEMPLATE_DIR}/`)) {
    if (e.isDirectory) {
      // Check if exists!!
      let exists;
      template.forEach((tmpl) => {
        exists = (e.name == tmpl) ? true : false;
      });
      // Copy the folder
      if (exists) {
        console.log(
          `Found the ${colors.bold(e.name)} template opening the prompt...`,
        );

        const ans = await ask.confirm({
          name: 'cwd',
          message: 'Copy the template to the current directory',
          type: 'confirm',
        });

        if (ans.cwd == true) {
          console.log(
            `${colors.brightGreen('Ok..')} coping the template: ${
              colors.bold(e.name)
            } to the ${colors.magenta(Deno.cwd())}`,
          );
          await copy(join(BASE_DIRECTORIES.TEMPLATE_DIR, e.name), Deno.cwd(), {
            overwrite: true,
          }).then(() => {
            LOGGER.done(
              `Successfully copied the ${
                colors.dim(e.name)
              } in the current directory!`,
            );
          }).catch((err) => {
            LOGGER.error(
              `Error coping the ${
                colors.dim(e.name)
              } template in the current directory!!\nError:\n${err}`,
            );
            Deno.exit(2);
          });
          Deno.exit();
        }

        // Copy to other path!!
        const path = await ask.input({
          name: 'path',
          message: 'Path to copy this template',
          type: 'input',
        });

        path.path = (typeof path.path == 'undefined') ? Deno.cwd() : path.path;

        if (path.path == Deno.cwd()) {
          LOGGER.warn(
            `Not valid input using the default ${colors.dim(Deno.cwd())} path`,
          );
        }

        console.log(
          `${colors.brightGreen('Ok..')} coping the template: ${
            colors.bold(e.name)
          } to the ${colors.magenta(path.path)}`,
        );

        await copy(join(BASE_DIRECTORIES.TEMPLATE_DIR, e.name), path.path, {
          overwrite: true,
        }).then(() => {
          LOGGER.done(
            `Successfully copied the ${
              colors.dim(e.name)
            } in the ${path.path} route`,
          );
        }).catch((err) => {
          LOGGER.error(
            `Error coping the ${
              colors.dim(e.name)
            } template in the ${path.path} directory!!\nError:\n${err}`,
          );
          Deno.exit(2);
        });
        Deno.exit();
      }
    }
  }

  LOGGER.error(
    `Not exists the template in the ${
      colors.dim(BASE_DIRECTORIES.TEMPLATE_DIR)
    }`,
  );
  Deno.exit(2);
}

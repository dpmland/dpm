// Copyright © 2022 Dpm Land. All Rights Reserved.

import { OtherRunner, Run, RunOut } from 'runner/main.ts';
import { LOGGER } from 'mods/logger.ts';
import { colors, Confirm, dracoFiles, Input, join, prompt } from 'mods/deps.ts';

export async function Publish() {
  LOGGER.info('Opening the prompt for make the release...');
  if (!dracoFiles.exists(join(Deno.cwd(), '.git'))) {
    const init: boolean = await Confirm.prompt(
      'Initialize the git repository',
    );
    if (init) {
      await OtherRunner('git', 'init');
    }
  }

  const [remote, branch] = await Promise.all([
    RunOut('git remote'),
    RunOut('git branch --show-current'),
  ]);

  const ans = await prompt([{
    name: 'msg',
    message: 'Message for the release commit',
    type: Input,
  }, {
    name: 'tag',
    message: 'Tag for the commit and the git command',
    type: Input,
  }, {
    name: 'push',
    message: `Push ${
      remote.split('\n')[0]
    } on ${branch} branch to the repository?`,
    type: Confirm,
  }, {
    name: 'eggs',
    message: `Run the ${colors.bold('eggs publish')} command for publish?`,
    type: Confirm,
  }]);

  ans.tag = (typeof ans.tag == 'undefined' || ans.tag == '')
    ? 'v0.1.0'
    : ans.tag;
  ans.msg = (typeof ans.msg == 'undefined' || ans.msg == '')
    ? `release(${ans.tag}): automated by DPM`
    : ans.msg;

  await OtherRunner('git', 'add', '.', '--all');
  await OtherRunner('git', 'commit', '-m', ans.msg.toString());
  await OtherRunner('git', 'tag', ans.tag.toString());

  if (ans.push == true) {
    await Run(`git push ${remote.split('\n')[0]} ${branch} --tag ${ans.tag}`);
  }
  if (ans.eggs == true) {
    if (
      !dracoFiles.exists(join(dracoFiles.homeDir()!, '.deno', 'bin', 'eggs'))
    ) {
      LOGGER.error(
        'Not found the eggs cli for the eggs publish :( please install this with << dpm tools install >>',
      );
      Deno.exit(2);
    }

    await OtherRunner('eggs', 'publish');
  }

  LOGGER.done(`Successfully published the ${ans.tag} version!!`);
}

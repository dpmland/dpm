import { dirname } from 'mods/deps.ts';

export function AppendModuleToDpm(
  depName: Array<string>,
  host?: string,
  // TODO(Teo): Add the std setup
  // std?: boolean,
) {
  const url = [];
  host = (typeof host == 'undefined' || typeof host == 'boolean')
    ? 'deno.land/x'
    : host;
  console.log(host);
  for (const i of depName) {
    const URL_COMPLETE = dirname(`https://${host}/${i}`);
    url.push(`${URL_COMPLETE}/`);
  }
  return url;
}

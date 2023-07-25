import { ensureDir, join } from 'mods/deps.ts';

/** download and cache remote contents */
export async function cache(
  url: string,
): Promise<{ content: Uint8Array; contentType: string | null }> {
  const { protocol, hostname, port, pathname, search } = new URL(url);
  const isLocalhost = ['0.0.0.0', '127.0.0.1', 'localhost'].includes(hostname);
  const cacheDir = join(
    await getDenoDir(),
    'deps',
    protocol.replace(':', ''),
    hostname + (port ? '_PORT' + port : ''),
  );
  const hashname = toHex(
    await crypto.subtle.digest(
      'sha-256',
      new TextEncoder().encode(pathname + search),
    ),
  );
  const contentFilepath = join(cacheDir, hashname);
  const metaFilepath = join(cacheDir, hashname + '.metadata.json');

  if (
    !isLocalhost &&
    await existsFile(contentFilepath) &&
    await existsFile(metaFilepath)
  ) {
    const [content, meta] = await Promise.all([
      Deno.readFile(contentFilepath),
      Deno.readTextFile(metaFilepath),
    ]);
    try {
      const { headers = {} } = JSON.parse(meta);
      return {
        content,
        contentType: headers['content-type'] || null,
      };
    } catch (_e) {
      // ignore
    }
  }

  const retryTimes = 3;
  let err = new Error('Unknown');
  for (let i = 0; i < retryTimes; i++) {
    try {
      const resp = await fetch(url);
      if (resp.status >= 400) {
        err = new Error(resp.statusText);
        continue;
      }
      const buffer = await resp.arrayBuffer();
      const content = new Uint8Array(buffer);
      if (!isLocalhost) {
        const headers: Record<string, string> = {};
        resp.headers.forEach((val, key) => {
          headers[key] = val;
        });
        await ensureDir(cacheDir);
        await Promise.all([
          Deno.writeFile(contentFilepath, content),
          Deno.writeTextFile(
            metaFilepath,
            JSON.stringify(
              { headers, url, createdAt: Date.now() },
              undefined,
              2,
            ),
          ),
        ]);
      }
      return {
        content,
        contentType: resp.headers.get('content-type'),
      };
    } catch (e) {
      err = e;
    }
  }

  return Promise.reject(err);
}

function toHex(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** get the deno cache dir. */
async function getDenoDir() {
  const cmd = new Deno.Command(Deno.execPath(), {
    args: ['info', '--json'],
    stderr: 'null',
    stdout: 'piped',
  });
  const output = new TextDecoder().decode((await cmd.output()).stdout);
  const { denoDir } = JSON.parse(output);
  if (denoDir === undefined || !await existsDir(denoDir)) {
    throw new Error(`can"t find the deno dir`);
  }
  return denoDir;
}

/* check whether or not the given path exists as a directory. */
async function existsDir(path: string): Promise<boolean> {
  try {
    const fi = await Deno.lstat(path);
    if (fi.isDirectory) {
      return true;
    }
    return false;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }
    throw err;
  }
}

/* check whether or not the given path exists as regular file. */
async function existsFile(path: string): Promise<boolean> {
  try {
    const fi = await Deno.lstat(path);
    if (fi.isFile) {
      return true;
    }
    return false;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }
    throw err;
  }
}

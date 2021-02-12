import { join } from 'path';
import { readJson } from 'fs-extra';
import send from '@polka/send-type';
import { exactVersion } from './_helpers';

export async function get({ params: { version } }, res) {
  const path = join('src/data', exactVersion(version), 'index.json');
  const { readme } = await readJson(path);

  send(res, 200, { content: readme.content, sections: readme.sections, title: readme.title });
}

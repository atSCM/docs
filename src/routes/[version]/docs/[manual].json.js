import { join } from 'path';
import { readJson } from 'fs-extra';
import send from '@polka/send-type';
import { exactVersion } from './../_helpers';

export async function get({ params: { version, manual: slug } }, res) {
  const path = join('src/data', exactVersion(version), 'index.json');
  const { manuals, changelog } = await readJson(path);

  const manual = [...manuals, changelog].find(m => m.slug === slug);

  if (!manual) {
    send(res, 404, {});
    return;
  }

  send(res, 200, { content: manual.content, sections: manual.sections, title: manual.title });
}

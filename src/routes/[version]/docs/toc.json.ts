import { join } from 'path';
import { readJson } from 'fs-extra';
import send from '@polka/send-type';
import { exactVersion } from './../_helpers';

export async function get({ params: { version } }, res) {
  const path = join('src/data', exactVersion(version), 'index.json');
  const { manuals, changelog } = await readJson(path);

  const topics = [...manuals, changelog].map((item) => ({
    title: item.title,
    slug: item.slug,
    sections: item.sections,
  }));

  send(res, 200, topics);
}

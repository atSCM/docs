import { join } from 'path';
import { readJson } from 'fs-extra';
import toText from 'html-to-text';
import send from '@polka/send-type';
import { tags } from '../data/index.json'; // eslint-disable-line import/no-unresolved
import { loadReference } from './[version]/api/_data';

// NOTE: Search index is only created for tags

function eachTag(handle) {
  return Promise.all(tags.map(handle));
}

export async function get(req, res) {
  const readmeItems = await eachTag(async ({ tag, version }) => {
    const path = join('src/data', version, 'index.json');
    const { readme } = await readJson(path);

    return {
      title: 'README',
      text: readme.text,
      link: false,
      version: tag,
    };
  });

  const referenceIndexes = await eachTag(async ({ tag, version }) => {
    return { tag, index: await loadReference({ version, includeExternal: false }) };
  });

  const toItem = (slug, doc, version) => ({
    title: doc.name,
    text: toText.fromString(doc.description),
    link: `api/#${slug}`,
    version,
  });

  const referenceItems = [];
  for (const [slug, doc] of referenceIndexes[0].index) {
    const item = toItem(slug, doc, referenceIndexes[0].tag);

    if (referenceIndexes[1].index.has(slug)) {
      referenceIndexes[1].index.delete(slug);

      delete item.version;
    }

    referenceItems.push(item);
  }

  for (const [slug, doc] of referenceIndexes[1].index) {
    referenceItems.push(toItem(slug, doc, referenceIndexes[1].tag));
  }

  send(res, 200, {
    keys: ['title', 'text'],
    items: [
      ...readmeItems,
      ...referenceItems.flat(),

      // Additional items
      {
        title: 'Beta API reference',
        version: 'beta',
        link: 'api',
      },
    ],
  });
}

import { join } from 'path';
import { readJson } from 'fs-extra';
import toText from 'html-to-text';
import send from '@polka/send-type';
import { loadReference } from './[version]/api/_data';
import { eachTag } from './[version]/_helpers';

// NOTE: Search index is only created for tags

export async function get(req, res) {
  const readmeItems: { title: string }[] = await eachTag(async ({ tag, version }) => {
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

  const referenceItems: Array<ReturnType<typeof toItem>> = [];
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

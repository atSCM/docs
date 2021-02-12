import { join, dirname, relative, basename, extname } from 'path';
import { readJson } from 'fs-extra';
import slugify from 'slugify';
import { exactVersion } from '../_helpers';
import { processMarkdown } from '../../../lib/markdown';

function filterMap(array, callback) {
  return array.reduce((all, item, index) => {
    const result = callback(item, index, array);

    return result ? all.concat(result) : all;
  }, []);
}

interface ReferenceIndexItem {
  description: string;
  dirname: string;
  slug: string;

  longname?: string;
}

export class ReferenceIndex extends Map<string, ReferenceIndexItem> {
  static slug(doc) {
    const dir = dirname(relative('src', doc.memberof));
    const file = basename(doc.memberof, extname(doc.memberof));
    const slug = slugify(`${dir} ${file} ${doc.name}`);

    return { dir, file, slug };
  }

  readonly version: string;

  constructor(data, { version, external = true, unexported = false }) {
    const index = [];
    data.forEach((doc) => {
      if (!external && doc.kind === 'external') return;
      if (!unexported && !doc.export) return;
      if (!doc.memberof) return;

      const { dir, slug } = ReferenceIndex.slug(doc);

      index.push([
        slug,
        {
          ...doc,
          description: doc.description ? processMarkdown(doc.description).content : '',
          dirname: dir,
          slug,
        },
      ]);
    });

    super(index);

    this.version = version;
  }

  getMembers(slug) {
    const item = this.get(slug);

    if (!item) {
      throw new Error(`No such item '${slug}'`);
    }

    return filterMap(Array.from(this), ([, doc]) => {
      return doc.access === 'public' && doc.memberof === item.longname ? doc : false;
    });
  }
}

export async function loadReference({ version, ...options }) {
  const path = join(
    process.cwd(),
    'src/data',
    exactVersion(version),
    'repo/packages/atscm/docs/api/index.json'
  );
  const esdocIndex = await readJson(path);

  return new ReferenceIndex(esdocIndex, { version, ...options });
}

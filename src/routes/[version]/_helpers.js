import { tags } from '../../data/index.json'; // eslint-disable-line import/no-unresolved

export function exactVersion(slug) {
  const tag = tags.find(t => t.tag === slug);

  return tag ? tag.version : slug;
}

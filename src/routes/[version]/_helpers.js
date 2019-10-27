import { tags } from '../../data/index.json';

export function exactVersion(slug) {
  const tag = tags.find(t => t.tag === slug);

  return tag ? tag.version : slug;
}

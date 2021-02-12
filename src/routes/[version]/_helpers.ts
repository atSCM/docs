import { tags } from '../../data/index.json'; // eslint-disable-line import/no-unresolved

export type Tag = typeof tags[0];

export function eachTag<T>(handle: (tag: Tag) => T | Promise<T>): Promise<T[]> {
  return Promise.all(tags.map(handle));
}

export function exactVersion(slug) {
  const tag = tags.find((t) => t.tag === slug);

  return tag ? tag.version : slug;
}

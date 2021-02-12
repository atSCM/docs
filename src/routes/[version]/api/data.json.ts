import send from '@polka/send-type';
import { loadReference } from './_data';

function filterMap(array, callback) {
  return array.reduce((all, item, index) => {
    const result = callback(item, index, array);

    return result ? all.concat(result) : all;
  }, []);
}

export async function get({ params: { version } }, res) {
  const index = await loadReference({ version, external: false, unexported: true });

  const items = filterMap(Array.from(index), ([slug, doc]) => {
    if (!doc.export) return false;

    return {
      ...doc,
      members: index.getMembers(slug),
    };
  });

  send(res, 200, items);
}

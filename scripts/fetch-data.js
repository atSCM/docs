import { join } from 'path';
import packageJson from 'package-json';
import gittar from 'gittar';
import getOpts from 'getopts';
import { emptyDir, readFile, writeJson, readJson } from 'fs-extra';
import { processMarkdown } from '../src/lib/markdown';

export default async function run(args = process.argv.slice(2)) {
  const { clean, 'skip-fetch': skipFetch } = getOpts(args, {
    boolean: ['clean', 'skip-fetch'],
  });

  const dataDir = 'src/data';
  const index = {};

  if (clean) {
    await emptyDir(dataDir);
  }

  const info = await packageJson('atscm', { allVersions: true });

  const versionsToFetch = [];
  index.tags = Object.entries(info['dist-tags']).map(([tag, version]) => {
    versionsToFetch.push(version);

    return { tag, version };
  });

  await Promise.all(
    versionsToFetch.map(async version => {
      const dir = join(dataDir, version);
      const repoDir = join(dir, 'repo');

      const versionIndex = {
        manuals: [],
      };

      // Download repo
      // eslint-disable-next-line no-console
      console.log(skipFetch ? 'skip fetching' : 'fetching', version);
      if (!skipFetch) {
        const file = await gittar.fetch(`atscm/atscm#v${version}`);
        await gittar.extract(file, repoDir);
      }

      // Process readme
      versionIndex.readme = processMarkdown(await readFile(join(repoDir, 'README.md'), 'utf8'));

      // Find manual files
      const esdoc = await readJson(join(repoDir, 'esdoc.json'));
      const options = esdoc.plugins.find(p => p.name === 'esdoc-standard-plugin').option;
      versionIndex.esdocOptions = options;
      const manualFiles = options.manual.files.filter(p => p.includes('manual'));

      // Process manuals
      versionIndex.manuals = await Promise.all(
        manualFiles.map(async file => {
          return processMarkdown(await readFile(join(repoDir, file), 'utf8'));
        })
      );

      // Process changelog
      versionIndex.changelog = processMarkdown(
        await readFile(join(repoDir, 'CHANGELOG.md'), 'utf8'),
        {
          title: 'Changelog',
          slug: 'changelog',
        }
      );

      await writeJson(join(dir, 'index.json'), versionIndex, { spaces: 2 });
    })
  );

  await writeJson(join(dataDir, 'index.json'), index, { spaces: 2 });
}

run().catch(error => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exitCode = 1;
});

<script>
  import { onMount, getContext } from 'svelte';
  import { stores, goto } from '@sapper/app';
  import SEO from '../components/SEO.svelte';

  const { page } = stores();

  const { tags } = getContext('index');

  function widen(version) {
    const [, keep] = version.match(/^(.*)\.[0-9]+/) || [];

    return keep || null;
  }

  onMount(() => {
    const { version } = $page.query;

    function gotoVersion(match) {
      const exactMatch = match.version === version;
      let path = `/${match.tag || 'latest'}/`;

      if (!exactMatch) {
        path += `?requested=${version || 'none'}`;
      }

      goto(path, { replaceState: exactMatch });
    }

    if (!version) {
      // eslint-disable-next-line no-console
      console.error('No version passed, redirect to latest');
      return gotoVersion({ version: 'missing' });
    }

    let match;
    let current = version;

    /* eslint-disable no-loop-func,no-cond-assign */
    do {
      match = tags.find(t => t.version.startsWith(current));
    } while (!match && (current = widen(current)));
    /* eslint-enable */

    if (!match) {
      // eslint-disable-next-line no-console
      console.error(`No match for ${version}, redirect to latest`);
      return gotoVersion({ version: 'invalid' });
    }

    return gotoVersion(match);
  });
</script>

<SEO title="Redirecting..." description="This should only take a few seconds" />

<section class="hero is-fullheight-with-navbar">
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title">Redirecting...</h1>
      <p class="subtitle">This should only take a few seconds</p>

      <div class="buttons is-centered">
        <a href="latest" class="button is-link">Jump to latests docs</a>
      </div>
    </div>
  </div>
</section>

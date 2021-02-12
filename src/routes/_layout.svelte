<script lang="ts">
  import { onMount, setContext, tick } from 'svelte';
  import { stores } from '@sapper/app';
  import Navbar from '../components/Navbar.svelte';
  import CookieNotice from '../components/CookieNotice.svelte';
  import { gtag } from '../lib/analytics';
  import { tags } from '../data/index.json'; // eslint-disable-line import/no-unresolved
  import { analyticsTrackingId } from '../config';

  export let segment: string;

  const { page } = stores();

  $: {
    if (process.browser) {
      gtag('config', analyticsTrackingId, {
        page_path: $page.path,
      });
    }
  }

  setContext('index', { tags });

  onMount(async () => {
    await tick();
    document.body.setAttribute('data-hydrated', 'hydrated');
  });
</script>

<div class="fullscreen-content">
  <Navbar {segment} />

  <slot />
</div>

<footer class="footer">
  <div class="content has-text-centered">
    <p>
      <strong>atscm</strong>
      is an open source project by
      <a href="https://bachmann.info">Bachmann electronics</a>
      · The source code is licensed
      <a href="http://opensource.org/licenses/mit-license.php">MIT</a>
    </p>
    <p>
      <a href="https://github.com/atSCM/atscm/blob/master/.github/CONTRIBUTING.md" target="_blank">
        Get involved
      </a>
      ·
      <a href="https://github.com/atSCM/docs" target="_blank">Improve this page</a>
      ·
      <a href="https://www.bachmann.info/en/info/imprint/" target="_blank">Imprint</a>
    </p>
  </div>
</footer>

<CookieNotice />

<style>
  .fullscreen-content {
    min-height: 100vh;
  }
</style>

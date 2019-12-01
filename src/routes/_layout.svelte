<script>
  import { setContext } from 'svelte';
  import Navbar from '../components/Navbar.svelte';
  import { tags } from '../data/index.json'; // eslint-disable-line import/no-unresolved

  export let segment;

  setContext('index', { tags });
</script>

<style>
  .fullscreen-content {
    min-height: 100vh;
  }
</style>

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
    </p>
  </div>
</footer>

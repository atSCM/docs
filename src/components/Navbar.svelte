<script>
  import { stores } from '@sapper/app';
  import { getContext } from 'svelte';
  import SearchField from './SearchField.svelte';

  export let segment;

  $: version = !segment || segment === 'from-cli' ? 'latest' : segment;

  const { page } = stores();
  const { tags } = getContext('index');

  let menuOpen = false;
</script>

<nav class="navbar is-spaced">
  <div class="container">
    <div class="navbar-brand">
      <!-- class:is-active={segment === undefined} -->
      <a href="." class="navbar-item">
        <strong>atscm</strong>
      </a>

      <div
        role="button"
        class="navbar-burger burger"
        class:is-active={menuOpen}
        on:click={() => (menuOpen = !menuOpen)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </div>
    </div>

    <div class="navbar-menu" class:is-active={menuOpen} on:click={() => (menuOpen = false)}>
      <div class="navbar-start">
        <a href={version} class="navbar-item" class:is-active={$page.path.endsWith(segment)}>
          Readme
        </a>

        <a href="{version}/docs" class="navbar-item" class:is-active={$page.path.includes('docs')}>
          Manual
        </a>

        <a href="{version}/api" class="navbar-item" class:is-active={$page.path.includes('api')}>
          Reference
        </a>
      </div>

      <div class="navbar-end">
        {#if $page.params && $page.params.version && $page.params.version !== 'from-cli'}
          <div class="navbar-item has-dropdown is-hoverable">
            <p class="navbar-link">
              <span>
                Version:
                <strong>{$page.params.version}</strong>
              </span>
            </p>

            <div class="navbar-dropdown is-right">
              {#each tags as { tag, version }}
                <a
                  href={tag}
                  class="navbar-item is-flex"
                  class:is-active={tag === $page.params.version}>
                  <span>{tag} ({version})</span>
                </a>
              {/each}
            </div>
          </div>
        {/if}
        <div class="navbar-item search-item">
          <SearchField />
        </div>
        <div class="navbar-item">
          <div class="buttons">
            <a href="https://github.com/atscm" class="button is-light">
              <span class="icon">
                <i class="fab fa-github" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>

{#if $page.params && $page.params.version && $page.params.version !== 'latest'}
  <div class="message-section">
    <div class="container">
      <div class="message is-warning">
        <div class="message-body">Documentation for beta releases may be incomplete.</div>
      </div>
    </div>
  </div>
{/if}

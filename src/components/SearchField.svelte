<script>
  import FuzzySearch from 'fuzzy-search';
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';

  const { page } = stores();

  // Showing / hiding results
  let showResults = false;
  function handleDocumentClick() {
    showResults = false;
  }

  function resultLink(item) {
    return `${item.version || $page.params.version || 'latest'}${item.link ? `/${item.link}` : ''}`;
  }

  // Actual search
  let loadIndex;
  let index;
  let results = [];
  let gotTerm = false;

  const matchLength = 70;

  function findMatches(text, needle) {
    let result = text;
    const firstIndex = text.indexOf(needle);
    if (firstIndex > matchLength / 2) {
      result = `...${result.slice(firstIndex - 10)}`;
    }

    return result
      .slice(0, matchLength)
      .replace(
        new RegExp(needle, 'gi'),
        m => `<span class="match has-text-primary has-text-bold">${m}</span>`
      );
  }

  async function search(event) {
    await loadIndex;

    const needle = event.target.value.trim();
    gotTerm = Boolean(needle);
    if (!gotTerm) {
      results = [];
      return;
    }

    results = index
      .search(needle)
      .slice(0, 10)
      .map(result => ({
        ...result,
        matches: findMatches(result.text || result.title, needle),
      }));
  }

  onMount(() => {
    loadIndex = fetch('search-index.json')
      .then(r => r.json())
      .then(({ keys, items }) => {
        index = new FuzzySearch(items, keys, { sort: true });
      });
  });
</script>

<style>
  .dropdown-menu {
    max-width: 100%;
  }
  .dropdown-item {
    padding: 0.375rem 1rem;
  }

  .dropdown-item p {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dropdown-item p:first-child {
    display: flex;
  }

  .space {
    flex: 1;
    min-width: 1rem;
  }

  .matches :global(.match) {
    font-weight: bold;
  }
</style>

<svelte:body on:click={handleDocumentClick} />

<div class="dropdown" class:is-active={showResults} on:click|stopPropagation={() => {}}>
  <div class="dropdown-trigger">
    <div class="field">
      <div class="control has-icons-left">
        <input
          class="input"
          type="search"
          placeholder="Search..."
          on:input={search}
          on:focus={() => (showResults = true)} />
        <span class="icon is-small is-left">
          <i class="fas fa-search" />
        </span>
      </div>
    </div>
  </div>
  {#if gotTerm}
    <div class="dropdown-menu" role="menu">
      <div class="dropdown-content">
        {#each results as result}
          <a href={resultLink(result)} class="dropdown-item">
            <p>
              <strong>{result.title}</strong>
              {#if result.version}
                <span class="space" />
                <span class="tag is-light">{result.version}</span>
              {/if}
            </p>
            <p class="content matches">
              {@html result.matches}
            </p>
          </a>
        {/each}
        {#if !results.length}
          <p class="dropdown-item has-text-gray">No results</p>
        {/if}
      </div>
    </div>
  {/if}
</div>

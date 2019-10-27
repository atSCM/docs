<script context="module">
  export async function preload({ params: { version } }) {
    const index = await this.fetch(`${version}/api/data.json`).then(r => r.json());

    return { index };
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import Details from '../../../components/Details.svelte';
  import SEO from '../../../components/SEO.svelte';
  import Sidebar from './_sidebar.svelte';

  export let index;

  let folders = [];
  const folderMap = new Map();
  index.forEach(item => {
    let folder = folderMap.get(item.dirname);
    if (!folder) {
      folder = { dirname: item.dirname, items: [] };
      folders.push(folder);
      folderMap.set(item.dirname, folder);
    }
    folder.items.push(item);
  });

  const { page, preloading } = stores();

  const apiLink = item => `${$page.params.version}/api/#${item.slug}`;
  const paramString = p => (p ? `(${p.map(pp => pp.name).join(', ')})` : '');

  function jumpTo(e) {
    window.location = e.target.value;
  }
</script>

<style>
  .item {
    margin: 3rem 0;
  }
</style>

<SEO title="API Reference" description="Guides & tutorials" />

<div class="section">
  <div class="container">
    <nav class="field">
      <div class="select is-rounded" class:is-loading={$preloading}>
        <select on:change={jumpTo} value={$page.params.slug}>
          <option>Jump to...</option>
          {#each folders as { items, dirname } (dirname)}
            <optgroup label={dirname}>
              {#each items as item}
                <option value={apiLink(item.slug)}>{item.name}</option>
              {/each}
            </optgroup>
          {/each}
        </select>
      </div>
    </nav>
    <div class="columns">
      <div class="column is-3 is-hidden-touch">
        <Sidebar {folders} {apiLink} />
      </div>
      <div class="column">
        <h1 class="title">API Reference</h1>

        {#each index as item}
          <div class="item">
            <h2 id={item.slug} class="title is-5">
              <a href={apiLink(item)} class="anchor">#</a>
              {item.name}{paramString(item.params)}
            </h2>

            <div class="content">
              {@html item.description}
            </div>

            {#if item.members.length}
              <div class="members">
                <Details>
                  <span slot="summary" let:open>{open ? 'Hide members' : 'Show members'}</span>
                  <div class="notification is-white">
                    <div class="table-container">
                      <table class="table">
                        {#each item.members as member}
                          <tr>
                            <td class="has-text-grey">
                              {#if member.static}
                                <span>static</span>
                              {/if}
                              {#if member.kind === 'get'}
                                <span>get</span>
                              {/if}
                            </td>
                            <th>{member.name}{paramString(member.params)}</th>
                            <td>
                              {@html member.description}
                            </td>
                          </tr>
                        {/each}
                      </table>
                    </div>
                  </div>
                </Details>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

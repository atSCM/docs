<script context="module">
  import { tags } from '../../data/index.json';

  export async function preload({ params: { version } }) {
    if (!tags.find(({ tag }) => tag === version)) {
      return this.error(404, `Unknown release tag '${version}'`);
    }
    const data = await this.fetch(`${version}/readme.json`).then(r => r.json());

    return { readme: data };
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import SEO from '../../components/SEO.svelte';

  export let readme;

  const { page } = stores();
</script>

<SEO title="Readme" description="Learn how to get started with atscm" />

<div class="section">
  <div class="container">
    <div class="columns">
      <main class="column">
        <div class="content">
          {@html readme.content}
        </div>
      </main>
      <div class="column is-3 is-hidden-mobile">
        <aside class="menu">
          <p class="menu-label">{readme.title}</p>
          <ul class="menu-list">
            {#each readme.sections as section}
              <li>
                <a href="{$page.path}#{section.slug}">{section.title}</a>
              </li>
            {/each}
          </ul>
        </aside>
      </div>
    </div>
  </div>
</div>

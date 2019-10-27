<script context="module">
  export async function preload({ params: { version } }) {
    const topics = await this.fetch(`${version}/docs/overview.json`).then(r => r.json());

    return { topics };
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import SEO from '../../../components/SEO.svelte';

  export let topics = [];

  const { page } = stores();
</script>

<style>
  .box .content {
    font-size: 0.75em;
  }
</style>

<SEO title="Manual" description="Guides & tutorials" />

<h1 class="title">Manual</h1>
<p class="subtitle">Select one of the manuals below:</p>

{#each topics as topic}
  <a class="box" href="{$page.params.version}/docs/{topic.slug}">
    <div class="content">
      {@html topic.description}
    </div>
    <div class="buttons is-right">
      <div class="button is-link">View</div>
    </div>
  </a>
{/each}

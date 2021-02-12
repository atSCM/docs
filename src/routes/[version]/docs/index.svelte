<script context="module">
  export async function preload({ params: { version } }) {
    const topics = await this.fetch(`${version}/docs/overview.json`).then((r) => r.json());

    return { topics };
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import SEO from '../../../components/SEO.svelte';

  export let topics = [];

  const { page } = stores();
</script>

<SEO title="Manual" description="Guides & tutorials" />

<h1 class="title">Manual</h1>
<p class="subtitle">Select one of the manuals below:</p>

{#each topics as topic}
  <div class="box">
    <div class="content">
      {@html topic.description}
    </div>
    <div class="buttons is-right">
      <a class="button is-link" href="{$page.params.version}/docs/{topic.slug}">View</a>
    </div>
  </div>
{/each}

<style>
  .box .content {
    font-size: 0.75em;
  }
</style>

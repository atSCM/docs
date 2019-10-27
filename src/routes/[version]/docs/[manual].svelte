<script context="module">
  export async function preload({ params: { version, manual: slug } }) {
    const response = await this.fetch(`${version}/docs/${slug}.json`);
    if (!response.ok) {
      this.error(response.status, response.statusText);
    }

    return { manual: await response.json() };
  }
</script>

<script>
  import SEO from '../../../components/SEO.svelte';

  export let manual;
</script>

<SEO title={manual.title} description="{manual.title} in the atscm manual pages" />

<div class="content">
  {@html manual.content}
</div>

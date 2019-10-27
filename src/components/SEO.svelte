<script>
  export let title;
  export let description;
  export let addName = true;
</script>

<svelte:head>
  <title>{title}{addName ? ' – atscm' : ''}</title>
  <meta name="description" content={description} />
</svelte:head>

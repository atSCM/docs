<script>
  import { stores } from '@sapper/app';

  export let topics;

  const { page } = stores();

  const isActive = topic => $page.params.manual === topic.slug;

  const link = (topic, section) =>
    `${$page.params.version}/docs/${topic.slug}/${section ? `#${section.slug}` : ''}`;

  $: topicsExpanded = topics.map(t => isActive(t));
</script>

<aside class="menu">
  <ul class="menu-list">
    {#each topics as topic, i}
      <li>
        <a href={link(topic)} class:is-active={isActive(topic)}>{topic.title}</a>
        {#if topicsExpanded[i] && topic.sections.length}
          <ul class="menu-list">
            {#each topic.sections as section}
              <li>
                <a href={link(topic, section)}>{section.title}</a>
              </li>
            {/each}
          </ul>
        {/if}
      </li>
    {/each}
  </ul>
</aside>

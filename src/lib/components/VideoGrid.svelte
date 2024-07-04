<script lang="ts">
  import type { Video } from "$lib/types";
  import VideoCard from "./VideoCard.svelte";

  export let videos: Video[];
</script>

<div class="video-grid">
  {#each videos as video}
    <VideoCard {video} />
  {/each}
</div>

<style>
  .video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
</style>

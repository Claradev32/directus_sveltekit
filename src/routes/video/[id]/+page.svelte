<script lang="ts">
  import { page } from "$app/stores";
  import { getVideo, incrementViews } from "$lib/services";
  import VideoPlayer from "svelte-video-player";
  import type { Video } from "$lib/types";

  let video: Video | null = null;

  $: id = $page.params.id;
  $: if (id) {
    getVideo(id)
      .then((v: Video) => {
        video = v;
        incrementViews(id);
      })
      .catch((error) => {
        console.error("Error fetching video:", error);
      });
  }

</script>
{#if video}
  <h1>{video.title}</h1>
  <p>
    {video.views} views • {new Date(video.upload_date).toLocaleDateString()}
  </p>
  <VideoPlayer
    poster={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${video.thumbnail.id}`}
    source={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${video.video_file.id}`}
  />
  <h2>Description</h2>
  <p>{video.description}</p>
  <h2>Tags</h2>
  <div class="tags">
    {#each video.tags as tag}
      <span class="tag">{tag}</span>
    {/each}
  </div>
{:else}
  <p>Loading...</p>
{/if}

<style>
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .tag {
    background-color: #eee;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
  }
</style>

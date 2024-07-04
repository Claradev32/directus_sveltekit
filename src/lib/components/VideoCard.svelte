<script lang="ts">
  import type { Video } from "$lib/types";
  export let video: Video;
</script>

<a href="/video/{video.id}" class="video-card">
  <img
    src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${video.thumbnail.id}`}
    alt={video.title}
  />
  <h3>{video.title}</h3>
  <p>
    {video.views} views • {new Date(video.upload_date).toLocaleDateString()}
  </p>
</a>

<style>
  .video-card {
    display: block;
    text-decoration: none;
    color: inherit;
  }
  img {
    width: 100%;
    height: auto;
  }
</style>

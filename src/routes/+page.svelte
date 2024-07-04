<!-- <script lang="ts">
  import { onMount } from "svelte";
  import { getVideos } from "$lib/services/index";
  import VideoGrid from "$lib/components/VideoGrid.svelte";
  import type { Video } from "$lib/types";

  let videos: Video[] = [];

  onMount(async () => {
    try {
      videos = await getVideos({
        sort: ["-upload_date"],
        limit: 20,
        fields: ["*", "thumbnail.*", "video_file.*"],
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  });
</script>

<h1>Stream your favourite vidoes</h1>


{#if videos.length > 0}
  <VideoGrid {videos} />
{:else}
  <p>Loading videos...</p>
{/if} -->

<script lang="ts">
  import { onMount } from "svelte";
  import { getVideos, searchVideos } from "$lib/services/index";
  import VideoGrid from "$lib/components/VideoGrid.svelte";
  import type { Video } from "$lib/types";

  let videos: Video[] = [];
  let searchQuery = "";
  let searchResults: Video[] = [];
  let isSearching = false;

  onMount(async () => {
    await loadLatestVideos();
  });

  async function loadLatestVideos() {
    try {
      videos = (await getVideos({
        sort: ["-upload_date"],
        limit: 20,
        fields: ["*", "thumbnail.*", "video_file.*"],
      })) as Video[];
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  async function handleSearch() {
    if (searchQuery.trim()) {
      isSearching = true;
      try {
        const response = await searchVideos(searchQuery);
        console.log(response)
        searchResults = response as Video[];
      } catch (error) {
        console.error("Error searching videos:", error);
      } finally {
        isSearching = false;
      }
    } else {
      searchResults = [];
    }
  }
</script>

<h1>Stream your favourite vidoes</h1>

<form on:submit|preventDefault={handleSearch}>
  <input type="text" bind:value={searchQuery} placeholder="Search for videos" />
  <button type="submit">Search</button>
</form>

{#if isSearching}
  <p>Searching...</p>
{:else if searchResults.length > 0}
  <h2>Search Results</h2>
  <VideoGrid videos={searchResults} />
{:else if searchQuery}
  <p>No results found.</p>
{:else}
  <h2>Latest Videos</h2>
  {#if videos.length > 0}
    <VideoGrid {videos} />
  {:else}
    <p>Loading videos...</p>
  {/if}
{/if}

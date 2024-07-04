import getDirectusClient from "$lib/directus";
import { readItems, readItem, updateItem } from "@directus/sdk";
import type { Video } from "$lib/types";

export async function getVideos(params = {}): Promise<Video[]> {
  const directus = getDirectusClient();
  const response = await directus.request(readItems("videos", params));
  return response as Video[];
}

export async function getVideo(id: string): Promise<Video> {
  const directus = getDirectusClient();
  const response = await directus.request(
    readItem("videos", id, {
      fields: ["*", "thumbnail.*", "video_file.*"],
    })
  );
  return response as Video;
}

export async function incrementViews(id: string) {
  const directus = getDirectusClient();
  const video = await directus.request(readItem("videos", id));
  await directus.request(
    updateItem("videos", id, { views: parseInt(video.views || 0) + 1 })
  );
}

export async function searchVideos(query: string): Promise<Video[]> {
  console.log(query)
  const directus = getDirectusClient();
  const response = await directus.request(
    readItems("videos", {
      search: query,
      fields: ["*", "thumbnail.*", "video_file.*"],
    })
  );
  return response as Video[];
}



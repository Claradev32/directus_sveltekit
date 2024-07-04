import { createDirectus, rest } from "@directus/sdk";

export const DIRECTUS_API_URL = import.meta.env.VITE_DIRECTUS_URL;

function getDirectusClient() {
  const directus = createDirectus(DIRECTUS_API_URL).with(rest());
  return directus;
}
export default getDirectusClient;

const dev = false;
export const port = 8080;
export const mainInterval = 6 * 60 * 60 * 1000; // 6 hours
export const siteIterval = 15 * 60 * 1000; // 15 minutes

export const libRedditUrl = dev
  ? "http://localhost:3000/libRedditInstances.json"
  : "https://raw.githubusercontent.com/libreddit/libreddit-instances/master/instances.json";

export const tedditUrl = dev
  ? "http://localhost:3000/tedditInstances.json"
  : "https://codeberg.org/teddit/teddit/raw/branch/main/instances.json";

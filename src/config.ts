const dev = true;
export const port = 8080;
export const mainInterval = 6 * 60 * 60 * 1000; // 6 hours
export const siteIterval = 15 * 60 * 1000; // 15 minutes

export const url = dev
  ? "http://localhost:3000/instances.json"
  : "https://raw.githubusercontent.com/libreddit/libreddit-instances/master/instances.json";

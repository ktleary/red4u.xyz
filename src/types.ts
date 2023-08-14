export type Instance = {
  url: string;
  country?: string;
  version?: string;
  description?: string;
};

export type LibRedditData = {
  updated: string;
  instances: Instance[];
};

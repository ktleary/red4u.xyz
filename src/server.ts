import {
  port,
  libRedditUrl,
  tedditUrl,
  mainInterval,
  siteIterval,
} from "./config";
import fs from "fs";
// import fetch from "node-fetch";
import express from "express";
import { type } from "os";

const app = express();

// type Instance = {
//   url: string;
//   country?: string;
//   version?: string;
//   description?: string;
// };

// type InstanceData = {
//   updated: string;
//   instances: Instance[];
// };

async function isSiteAlive(url: string) {
  try {
    const response = await fetch("http://localhost:3000/");
    // const response = await fetch(url);
    if (response.status === 200) {
      const content = await response.text();
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

// async function fetchLibRedditData() {
//   const response = await fetch(libRedditUrl);
//   const data = await response.json();
//   return data;
// }

// async function fetchTedditData() {
//   const response = await fetch(tedditUrl);
//   const data = await response.json();
//   return data;
// }

async function fetchData(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

type Instance = {
  url: string;
  country?: string;
  version?: string;
  description?: string;
};

type LibRedditData = {
  updated: string;
  instances: Instance[];
};

const INSTANCES_TYPES = {
  LIBREDDIT: "libreddit",
  TEDDIT: "teddit",
};

const FILE_NAMES = {
  LIBREDDIT: "libRedditInstances.json",
  TEDDIT: "tedditInstances.json",
};

function saveToFile(instances: string[], instancesType: string) {
  const filename =
    instancesType === INSTANCES_TYPES.LIBREDDIT
      ? FILE_NAMES.LIBREDDIT
      : FILE_NAMES.TEDDIT;
  fs.writeFileSync(filename, JSON.stringify(instances, null, 2));
}

// data was written to file as an array of url strings
function readFromFile(instancesType: string) {
  const filename =
    instancesType === INSTANCES_TYPES.LIBREDDIT
      ? FILE_NAMES.LIBREDDIT
      : FILE_NAMES.TEDDIT;

  const rawData = fs.readFileSync(filename, "utf-8");
  const instances: string[] = JSON.parse(rawData);
  return instances;
}

const goodInstances = {
  [INSTANCES_TYPES.LIBREDDIT]: [],
  [INSTANCES_TYPES.TEDDIT]: [],
};

// create a helper to determine if the url contains http or https
const hasProtocol = (url: string = "") => {
  return url.startsWith("http://") || url.startsWith("https://");
};

// check instances and save good instances to goodInstances
async function checkInstances(instances: string[], instancesType: string) {
  goodInstances[instancesType].length = 0;

  for (const instance of instances) {
    if (!instance || !hasProtocol(instance)) {
      continue;
    }
    console.log(`Checking ${instance}`);
    if (!(await isSiteAlive(instance))) {
      console.log(`Warning: ${instance} might be down.`);
      continue;
    }
    goodInstances[instancesType].push(instance);
  }

  console.log("goodInstances", goodInstances, instancesType);
}

const validInstanceFilter = (instance: Instance) =>
  instance.url && hasProtocol(instance.url);

const extractUrl = (instance: Instance) => instance.url;

// fetch main instance data and submit it for checking
async function processInstanceData() {
  try {
    const libRedditData: LibRedditData = await fetchData(libRedditUrl); // instances are nested
    const libRedditInstances: Instance[] = libRedditData?.instances; // extract libred instances
    const tedditInstances: Instance[] = await fetchData(tedditUrl); // array of instances

    if (tedditInstances?.length) {
      const uncheckedTedditInstances: string[] = tedditInstances
        .filter(validInstanceFilter)
        .map(extractUrl);
      saveToFile(uncheckedTedditInstances, INSTANCES_TYPES.TEDDIT);
      checkInstances(uncheckedTedditInstances, INSTANCES_TYPES.TEDDIT);
    }

    if (libRedditInstances?.length) {
      const uncheckedLibRedditInstances: string[] = libRedditInstances
        .filter(validInstanceFilter)
        .map(extractUrl);
      saveToFile(uncheckedLibRedditInstances, INSTANCES_TYPES.LIBREDDIT);
      checkInstances(uncheckedLibRedditInstances, INSTANCES_TYPES.LIBREDDIT);
    }
  } catch (err) {
    console.error("Error in processInstanceData:", err);
  }
}
// fetch the main data every 6 hours
setInterval(processInstanceData, mainInterval);

// check instances availability every 15 minutes
setInterval(() => {
  try {
    const rawLibRedditInstances = readFromFile(INSTANCES_TYPES.LIBREDDIT);
    const rawTedditInstances = readFromFile(INSTANCES_TYPES.TEDDIT);
    checkInstances(rawLibRedditInstances, INSTANCES_TYPES.LIBREDDIT);
    checkInstances(rawTedditInstances, INSTANCES_TYPES.TEDDIT);
  } catch (err) {
    console.error("Error in check intervals:", err);
  }
}, siteIterval);

(function initialize() {
  processInstanceData();
})();

app.get("/api/instances/active", (req: any, res: any) => {
  res.status(200).json(goodInstances);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});

/*
libReddit data structure example:
{
"updated": "2023-08-13",
"instances": [
{
"url": "https://safereddit.com",
"country": "US",
"version": "v0.30.1",
"description": "SFW only"
},
{
"url": "https://libreddit.kavin.rocks",
"country": "IN",
"version": "v0.30.1"
},
//...
]
}

teddit data structure example:

[
{
"url": "https://teddit.net"
},
{
"url": "https://teddit.ggc-project.de"
},
{
"url": "https://teddit.zaggy.nl"
},
//..
]
*/

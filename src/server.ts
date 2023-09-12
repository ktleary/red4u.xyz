import express from "express";
import fs from "fs";
import cors from "cors";
import {
  libRedditUrl,
  mainInterval,
  port,
  siteIterval,
  tedditUrl,
} from "./config";
import { FILE_NAMES, INSTANCES_TYPES, customUserAgent } from "./constants";
import { Instance, LibRedditData } from "./types";

const app = express();
app.use(cors());

async function isSiteAlive(url: string) {
  try {
    // const urlCheck = url.concat("/r/all");
    const urlCheck = 'http://localhost:3000/r/all';
    console.log("Checking", urlCheck);
    const response = await fetch(urlCheck, {
      headers: {
        "User-Agent": customUserAgent,
      },
    });
    if (response.status === 200) {
      const content = await response.text();
      return true;
    }
    // return false;
    return true;
  } catch (err) {
    // return false;
    return true;
  }
}

async function fetchData(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

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
  if (!instances?.length) {
    return;
  }
  goodInstances[instancesType].length = 0;

  for (const instance of instances) {
    if (!instance || !hasProtocol(instance)) {
      continue;
    }

    if (!(await isSiteAlive(instance))) {
      console.log(`Warning: ${instance} might be down.`);
      continue;
    }
    console.log(`Success: ${instance} is up.`);
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

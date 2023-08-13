import { port, url, mainInterval, siteIterval } from "./config";
import fs from "fs";
import fetch from "node-fetch";
import express from "express";

const app = express();

type Instance = {
  url: string;
  country?: string;
  version?: string;
  description?: string;
};

type InstanceData = {
  updated: string;
  instances: Instance[];
};

async function isSiteAlive(url: string) {
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const content = await response.text();
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

async function fetchData() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function saveToFile(data: InstanceData) {
  fs.writeFileSync("instances.json", JSON.stringify(data, null, 2));
}

function readFromFile() {
  const rawData = fs.readFileSync("instances.json", "utf-8");
  return JSON.parse(rawData);
}

const goodInstances = [];

// every 15 minutes
async function checkInstances(instances: Instance[]) {
  goodInstances.length = 0;
  for (const instance of instances) {
    console.log(`Checking ${instance.url}`);
    // if (!(await isSiteAlive(instance.url))) {
    //   console.log(`Warning: ${instance.url} might be down.`);
    //   continue;
    // }
    goodInstances.push(instance.url);
  }
}

setInterval(() => {
  const rawInstances = readFromFile();
  checkInstances(rawInstances.instances);
}, siteIterval);

// Every 6 hours
setInterval(async () => {
  try {
    const data: any = await fetchData();
    if (data.instances.length === 0) {
      // keep the old data
      console.error("Error: No instances found, using last known good data.");
      return;
    }

    saveToFile(data);
    checkInstances(data.instances);
  } catch (err) {
    console.error("Error during update:", err);
  }
}, mainInterval);

(async function initialize() {
  const data: any = await fetchData();
  saveToFile(data);
  checkInstances(data.instances);
})();

app.get("/api/instances/active", (req: any, res: any) => {
  res.status(200).json(goodInstances);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});

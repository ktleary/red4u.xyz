import { endpoint, testing, testInstances } from "../config";

const getInstanceData = async () => {
  if (testing) {
    return new Promise((resolve) => {
      resolve(testInstances);
    });
  }

  const response = await fetch(endpoint);
  const instances = await response.json();
  return instances;
};

export { getInstanceData };

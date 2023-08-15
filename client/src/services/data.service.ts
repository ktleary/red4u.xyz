import { endpoint, testing, testInstances } from "../config";

const getInstanceData = async () => {
  if (testing) {
    return new Promise((resolve) => {
      resolve(testInstances);
    });
  }

  try {
    const response = await fetch(endpoint);
    const instances = await response.json();
    return instances;
  } catch (error: any) {
    const { name, message } = error;
    console.log(`Error: ${name} - ${message}`);
    return {};
  }
};

export { getInstanceData };

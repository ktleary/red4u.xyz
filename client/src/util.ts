const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const buildUrls = (instances: string[], name: string) =>
  instances.reduce(
    (agg, instance) => [...agg, instance.concat("/").concat(name)],
    []
  );

const randomListItem = (list: string[]) =>
  Math.floor(Math.random() * list.length);
const getRandomListItem = (list: string[]) => list[randomListItem(list)];

const feelingLucky = (instanceLinks: string[]) => {
  const selectedInstanceLink = getRandomListItem(instanceLinks);
  document.location.href = selectedInstanceLink;
};

const getPathname = (url: string) => {
  try {
    const newUrl = new URL(url);
    return newUrl.pathname;
  } catch {
    return "";
  }
};

const removeLeadingSlash = (pathname: string) =>
  pathname.charAt(0) === "/" ? pathname.slice(1) : pathname;

export { buildUrls, feelingLucky, getPathname, isValidUrl, removeLeadingSlash };

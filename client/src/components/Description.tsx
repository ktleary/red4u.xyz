import * as React from "react";

const Description = () => (
  <>
    <p>
      OpenRed works by using instance data from{" "}
      <a href="https://github.com/libreddit/libreddit-instances">
        libreddit-instances on github
      </a>{" "}
      and <a href="https://codeberg.org/teddit/teddit/">teddit on codeberg</a>
      <div>
        Sites on the lists are checked for uptime availability every 15 minutes
      </div>
    </p>
    <p>
      Enter a Reddit sub or URL and press LIST to view an available instance
      list pre-populated with your text or GO RANDOM! to be automatically
      redirected to a random instance. If you wish to filter by LibReddit or
      Teddit, select the appropriate radio button.
    </p>
    <p>
      Random is recommended to more evenly distribute the load across all
      available instances, though results are less reliable than selecting your
      favorite intance from the list, as some unstable instances sometimes
      experience uptime volatility in short periods of time.
    </p>
  </>
);

export default Description;

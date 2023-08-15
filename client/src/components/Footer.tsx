import * as React from "react";

const Footer = () => (
  <div>
    <h2>About</h2>
    <p>
      openRed respects your privacy is a free and open source GPL-3 licensed
      tool which uses no cookies or tracking. All URL transformations happen in
      the browser.
    </p>
    <p>
      Source code is available for both the{" "}
      <a href="https://git.sr.ht/~djlooop/openRed">client and server</a> at
      sourcehut.
    </p>
    <div>
      <h2>Related Tools</h2>
      <ul>
        <li>
          <a href="https://twit2nit.xyz">twit2nit.xyz</a> creates Nitter links
          from twitter urls and code can be found on{" "}
          <a href="https://git.sr.ht/~djlooop/twit2nit">sourcehut</a>
        </li>
        <li>
          <a href="https://invidi.link">invidi.link</a> creates Invidious links
          from youtube urls and code can also be found on{" "}
          <a href="https://sr.ht/~djlooop/invidi.link/">sourcehut</a>
        </li>
      </ul>
    </div>
    <p>
      For questions or comments, please contact{" "}
      <a href="https://sr.ht/~djlooop">djlooop</a>.
    </p>
  </div>
);

export default Footer;

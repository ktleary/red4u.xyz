# red4u

red4u polls [libreddit-instances](https://github.com/libreddit/libreddit-instances) and [teddit](https://codeberg.org/teddit/teddit/) instances for availability and allows users to choose or randomly be redirected to a healthy site.

Users may submit:

- reddit sub (e.g. llama)
- reddit url (e.g. https://www.reddit.com/r/LocalLLaMA/comments/14axesy/best_llama_model_for_mac_m1/)

Servers are polled every 15 minutes, but due to rate limiting and many instances being self-hosted, sometimes an instance receiving a redirect may be temporarily unavailable.

red4u UI works by fetching a list of good instances from a server and presenting users with viewing options.

## In the wild

- visit [https://red4u.xyz](https://red4u.xyz) to try the app

## Development

red4u UI is built in React JS.

- installation: git clone
- dev server: yarn start
- build: yarn build

## Privacy and License

red4u is a free and open source, privacy-respecting GPL-3 licensed tool and does not use cookies or tracking.

## Contributing

- Please contact development @ sr.ht/~djlooop with any questions or requests.

## Similar Projects

- [twit2nit.xyz](https://twit2nit.xyz) is a similar project that redirects to nitter instances and can also be found on [sourcehut](https://sr.ht/~djlooop/twit2nit.xyz)
- [invidi.link](https://invidi.link) creates Invidious links and can also be found on [sourcehut](https://sr.ht/~djlooop/invidi.link)

const testInstances = {
  libreddit: [
    "https://safereddit.com",
    "https://libreddit.kavin.rocks",
    "https://reddit.simo.sh",
    "https://lr.riverside.rocks",
    "https://libreddit.strongthany.cc",
    "https://libreddit.privacy.com.de",
    "https://reddit.baby",
    "https://libreddit.domain.glass",
    "https://libreddit.pussthecat.org",
    "https://libreddit.northboot.xyz",
    "https://libreddit.hu",
    "https://r.walkx.fyi",
    "https://libreddit.kylrth.com",
    "https://libreddit.tiekoetter.com",
    "https://reddit.rtrace.io",
    "https://reddit.dr460nf1r3.org",
    "https://l.opnxng.com",
    "https://libreddit.cachyos.org",
    "https://rd.funami.tech",
    "https://lr.slipfox.xyz",
    "https://libreddit.oxymagnesium.com",
    "https://reddit.utsav2.dev",
    "https://libreddit.freedit.eu",
    "https://libreddit.mha.fi",
    "https://lr.4201337.xyz",
    "https://lr.artemislena.eu",
    "https://lr.aeong.one",
    "https://reddit.smnz.de",
    "https://libreddit.bus-hit.me",
    "https://reddit.leptons.xyz",
    "https://r.darklab.sh",
    "https://snoo.habedieeh.re",
    "https://libreddit.kutay.dev",
  ],
  teddit: [
    "https://teddit.net",
    "https://teddit.ggc-project.de",
    "https://teddit.zaggy.nl",
    "https://teddit.tinfoil-hat.net",
    "https://teddit.domain.glass",
    "https://snoo.ioens.is",
    "https://teddit.httpjames.space",
    "https://teddit.xbdm.fun",
    "https://incogsnoo.com",
    "https://teddit.pussthecat.org",
    "https://reddit.lol",
    "https://teddit.sethforprivacy.com",
    "https://teddit.adminforge.de",
    "https://teddit.bus-hit.me",
    "https://teddit.froth.zone",
    "https://rdt.trom.tf/",
    "https://teddit.encrypted-data.xyz",
    "https://i.opnxng.com",
    "https://teddit.tokhmi.xyz",
    "https://teddit.garudalinux.org",
    "https://teddit.privacytools.io",
    "https://td.vern.cc",
    "https://teddit.rawbit.ninja",
    "https://teddit.artemislena.eu",
    "https://teddit.hostux.net",
    "https://teddit.no-logs.com/",
    "https://teddit.projectsegfau.lt",
  ],
};

/*
app.get("/api/instances/active", (req: any, res: any) => {
  res.status(200).json(goodInstances);
});
*/
const testing = true;

const endpoint = testing
  ? "http://localhost:8080/api/instances/"
  : "/api/instances/active";

export { endpoint, testing, testInstances };

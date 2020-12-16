const cacache = require('cacache');
const fs = require('fs');

const cachePath = '/tmp';

// * if key exists -> send metadata
cacache.get
  .hasContent(cachePath, 'sha256-MUSTVERIFY+ALL/THINGS==')
  .then(console.log('woo'));

// ! for case csv & normal data only
cache.get.stream(cachePath, key).on('metadata', (metadata) => {
  console.log('metadata:', metadata);
});

cacache.put(cachePath, key, value).then((integrity) => {
  console.log(`Saved content to ${cachePath}.`);
});

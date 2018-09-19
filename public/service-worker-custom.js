/* eslint-disable */

// bool for activating/deactivating cache
const doCache = true;

const CACHE_NAME = 'NodeBotDriver';

// activate, install, fetch

// Delete old cache
self.addEventListener('activate', (e) => {
  console.log('Activating...');
  const cacheWhiteList = [CACHE_NAME];
  e.waitUntil(
    caches.keys()
      .then((keylist) => {
        Promise.all(keylist.map((key) => {
          if (cacheWhiteList.includes(key)) {
            console.log(`Deleting the cache ${key}`);
            return caches.delete(key);
          }
        }));
      }),
  );
});


self.addEventListener('install', (e) => {
  console.log('Installing...');
  if (doCache) {
    e.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          // Get magic bundle name from webpack
          // Located in asset-manifest.json
          fetch('asset-manifest.json')
            .then(res => res.json())
            .then((assets) => {
              //Open cache and add files from manifest
              //Including static assets(img, fonts etc)
              const urlsToCache = [
                '/',
                assets['main.js']
              ]

              cache.addAll(urlsToCache)

              console.log(`cached, ${urlsToCache}`);
            });
        }),
    );
  }
});

self.addEventListener('fetch', (e) => {
  if(doCache) {
    e.respondWith(
      caches.match(e.request)
        .then(res => {
          return res || fetch(e.request)
        })
    )
  }
})

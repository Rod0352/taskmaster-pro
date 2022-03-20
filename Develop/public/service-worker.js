const APP_PREFIX = 'TasmkasterPro-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    './index.html',
    './css/style.css',
    './js/index.js',
    './js/idb.js',
    './manifest.json',
    './icons/horse-16x16.png',
    './icons/horse-24x24.png',
    './icons/horse-32x32.png',
    './icons/horse-48x48.png',
    './icons/horse-64x64.png',
    './icons/horse-128x128.png',
    './icons/horse-256x256.png',
    './icons/horse-512x512.png'
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME);
            return cache.addAll(FILES_TO_CACHE)
        })
    )
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            let cacheKeeplist = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            });
            cacheKeeplist.push(CACHE_NAME);

            return Promise.all(keyList.map(function (key, i) {
                if (cacheKeeplist.indexOf(key) === -1) {
                    console.log('deleting cache : ' + keyList[i]);
                    return caches.delete(keyList[i]);
                }
            }));
        })
    )
});

self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (request) {
            if (request) { // if cache is available, respond with cache
                console.log('responding with cache : ' + e.request.url);
                return request
            } else {       // if there are no cache, try fetching request
                console.log('file is not cached, fetching : ' + e.request.url);
                return fetch(e.request)
            }

        })
    )
});
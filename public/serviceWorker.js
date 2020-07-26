self = this;
const CACHE_NAME = "version1";
const urls = ["index.html", "offline.html"];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urls);
            })
    )
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then(() => {
            console.log(event.request);
            return fetch(event.request)
                .catch(() => { return caches.match("offline.html") })
        })
    )
});

self.addEventListener("activate", (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhiteList.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});
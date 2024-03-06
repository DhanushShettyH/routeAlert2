const CACHE_NAME = 'routealert-v1';

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll([
          '/home.html',
          '/index.html',
          '/logic.js',
          '/manifest.json',
          '/styles.css',
          '/image.png',
        ]);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // If the requested resource is found in cache, return it
        if (cachedResponse) {
          return cachedResponse;
        }

        // If not found in cache, fetch from network
        return fetch(event.request)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response as it needs to be used by both the browser and the cache
            const responseToCache = response.clone();

            // Open the cache and put the fetched response in it
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
      .catch(error => {
        // Network fetch failed, return a custom offline page or fallback
        console.error('Error fetching data:', error);
        // You could return a custom offline page here if you have one
      })
  );
});

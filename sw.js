const CACHE = 'andresan-v2026-v4';
const ARCHIVOS = [
  './',
  './index.html',
  './app-manifest.json',
  './icon.png'
];

self.addEventListener('install', e => {
  console.log('SW: Instalando...');
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c => {
      console.log('SW: Cacheando archivos...');
      return c.addAll(ARCHIVOS).catch(err => {
        console.error('SW: Error al cachear archivos:', err);
      });
    })
  );
});

self.addEventListener('activate', e => {
  console.log('SW: Activado');
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim(); // Toma el control de inmediato
});

self.addEventListener('fetch', e => {
  // Ignorar peticiones que no sean GET
  if (e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request)
      .then(response => {
        // Actualizamos caché si hay red
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE).then(cache => {
            cache.put(e.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback a caché si no hay red
        return caches.match(e.request);
      })
  );
});

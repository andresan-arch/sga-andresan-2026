const CACHE = 'andresan-v2026-v2';
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
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});



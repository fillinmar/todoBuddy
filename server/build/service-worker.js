const staticCacheName ='a-app-v3';
const dynamicCacheName = 'd-app-v4'

const assetUrls = [
    'index.html',
    'static/js/main.0dc86373.js',
    'static/css/main.71a5b160.css',
]
self.addEventListener('install', async event=>{
    console.log('[SW] install');
    const cache = await caches.open(staticCacheName);
    await cache.addAll(assetUrls);

});

self.addEventListener('activate', async event=>{
    console.log('[SW] activate');
    const cachesNames = await caches.keys();
    // Clearing the cache
    await Promise.all(
        cachesNames.filter(name => name !== staticCacheName &&  name !== dynamicCacheName)
            .map(name=> caches.delete(name))
    )
});

async function cacheFirst(request) {
    const cache = await caches.open(staticCacheName);
    const cachedRequest =await cache.match(request);
    if (cachedRequest) {
        return cachedRequest
    }
    const response =  await fetch(request);
    await cache.put(request, response.clone())
    return response
}

async function networkFirst(request) {
    console.log('logs in networkFirst', request.method, request.method === 'POST')
    if(request.method === 'POST' || request.method === 'DELETE') {
        // todo: обновить кеш
        const result = await fetch(request);
        console.log('logs result', result)
        return result;
    }
    const cache = await caches.open(dynamicCacheName)
    try {
        const response = await fetch(request);
        await cache.put(request, response.clone())
        return response
    } catch (e) {
        console.log('[ERROR]: in networkFirst, error:', e)
        const cached = await cache.match(request)
        return cached;
    }
}

self.addEventListener('fetch', event=>{
    const {request} = event;
    console.log('logs event', event)
    const url = new URL(request.url);
    if (url.origin === location.origin && !url.pathname.includes('api')) {
        event.respondWith(cacheFirst(event.request));
    } else {
        event.respondWith(networkFirst(event.request))
    }
});



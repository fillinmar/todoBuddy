const staticCacheName ='a-app-v2';
const dynamicCacheName = 'd-app-v3'

const assetUrls = [
    'index.html',
    'static/js/main.5e5ea29f.js',
    'static/css/main.71a5b160.css',
    // todo add css file
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
    const cache = await caches.open(dynamicCacheName)
    try {
        const response = await fetch(request);
        await cache.put(request, response.clone())
        return response
    } catch (e) {
        const cached = await cache.match(request)
        return cached;
    }
}

self.addEventListener('fetch', event=>{
    const {request} = event;
    const url = new URL(request.url);
    console.log('logs url.origin', url.origin)
    if(url.origin === location.origin){
        event.respondWith(cacheFirst(event.request));
    } else {
        event.respondWith(networkFirst(event.request))
    }
});



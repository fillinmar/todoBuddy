const staticCacheName ='a-app-v2';
const dynamicCacheName = 'd-app-v3'

const assetUrls = [
    'index.html',
    'static/js/bundle.js',
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
    await Promise.all(
        cachesNames.filter(name => name !== staticCacheName &&  name !== dynamicCacheName)
            .map(name=> caches.delete(name))
    )
});

async function cacheFirst(request) {
    const cached =await caches.match(request);
    return cached ?? await fetch(request);
}

async function networkFirst(request) {
    const cache = await caches.open(dynamicCacheName)
    try {
        const response = await fetch(request);
        console.log('logs in networkFirst response', response)
        await cache.put(request, response.clone())
        return response
    } catch (e) {
        console.log('logs in networkFirst error', )
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



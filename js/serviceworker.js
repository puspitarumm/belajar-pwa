var CACHE_NAME = 'latihan-pwa-cache-vl';

var urlToCache = [
    '/',
    '/css/main.css',
    '/img/moon.png',
    'js/jquery.min.js',
    'js/main.js'


];

// install cache on browser

self.addEventListener ( 'install', function (event) {
    // do install 
    event.waitUntil (
        caches.open(CACHE_NAME).then(
           function (cache){
                //cek apakah cache sudah terinstall 
                console.log('service worker do install..');
                return cache.add(urlToCache);
            }
        )
    )
});

// aktivasi sw
self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                //jika sudah ada cache dengan versi beda maka dihapus
                cacheNames.filter(function(cacheNames){
                    return cacheNames !== CACHE_NAME;
                }).map(function(cacheNames){
                    return caches.delete(cacheNames);
                })
            );
        })
    );
});

// fetch sw
self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(       
            function(response){
                console.log(response);
                    if(response){
                        return response;
                    }
                    return fetch(event.request);
            }
        )
    )
});

const CACHE_NAME = 'shahul-portfolio-v2'
const urlsToCache = [
  '/',
  '/about',
  '/experience',
  '/projects',
  '/skills',
  '/contact',
  '/blog',
  '/manifest.json',
  '/favicon.svg'
]

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
      .catch((error) => {
        console.log('Cache install failed:', error)
      })
  )
  self.skipWaiting()
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event

  // Only handle same-origin GET requests; skip dev Vite/HMR endpoints
  const url = new URL(request.url)
  const isSameOrigin = url.origin === self.location.origin
  const isGET = request.method === 'GET'
  const isVite = url.pathname.startsWith('/@vite') || url.pathname.includes('vite')

  if (!isSameOrigin || !isGET || isVite) {
    return
  }

  event.respondWith((async () => {
    try {
      const cached = await caches.match(request)
      if (cached) return cached

      const networkResponse = await fetch(request)
      try {
        if (networkResponse && networkResponse.ok && networkResponse.type === 'basic') {
          const cache = await caches.open(CACHE_NAME)
          cache.put(request, networkResponse.clone())
        }
      } catch (e) {
        // Cache put errors ignored
      }
      return networkResponse
    } catch (e) {
      if (request.mode === 'navigate') {
        const cachedRoot = await caches.match('/')
        if (cachedRoot) return cachedRoot
      }
      return new Response('', { status: 504, statusText: 'Offline' })
    }
  })())
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm())
  }
})

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Portfolio',
        icon: '/icons/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/icon-192x192.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('Shahul Portfolio', options)
  )
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Helper function for contact form sync
async function syncContactForm() {
  try {
    // Get pending form submissions from IndexedDB
    const pendingSubmissions = await getPendingSubmissions()
    
    for (const submission of pendingSubmissions) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submission)
        })
        
        if (response.ok) {
          await removePendingSubmission(submission.id)
        }
      } catch (error) {
        console.log('Failed to sync submission:', error)
      }
    }
  } catch (error) {
    console.log('Sync failed:', error)
  }
}

// IndexedDB helpers (simplified)
async function getPendingSubmissions() {
  // Implementation would use IndexedDB
  return []
}

async function removePendingSubmission(id) {
  // Implementation would use IndexedDB
  console.log('Removed submission:', id)
}

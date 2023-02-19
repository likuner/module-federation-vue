import { register } from 'register-service-worker'

if (process.env.PWA_MODE) {
  register('/service-worker.js', {
    ready(data) {
      console.log('App is being served from cache by a service worker.', data)
    },
    registered(data) {
      console.log('Service worker has been registered.', data)
    },
    cached(data) {
      console.log('Content has been cached for offline use.', data)
    },
    updatefound(data) {
      console.log('New content is downloading.', data)
    },
    updated(data) {
      console.log('New content is available; please refresh.', data)
    },
    offline(data) {
      console.log('No internet connection found. App is running in offline mode.', data)
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    },
  })
}

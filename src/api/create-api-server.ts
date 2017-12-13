import * as Firebase from 'firebase/app'
import '@firebase/database'
import * as LRU from 'lru-cache'

export function createAPI ({ config, version }: { config: any, version: any }) {
  let api: any
  // this piece of code may run multiple times in development mode,
  // so we attach the instantiated API to `process` to avoid duplications
  if (process.__API__) {
    api = process.__API__
  } else {
    Firebase.initializeApp(config)
    api = process.__API__ = Firebase.database().ref(version)

    api.onServer = true

    // fetched item cache
    api.cachedItems = LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15 // 15 min cache
    })

    // cache the latest story ids
    api.cachedIds = {}
    ;['top', 'new', 'show', 'ask', 'job'].forEach(type => {
      api.child(`${type}stories`).on('value', (snapshot: any) => {
        api.cachedIds[type] = snapshot.val()
      })
    })
  }
  return api
}

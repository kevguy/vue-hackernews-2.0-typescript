import * as Firebase from 'firebase/app'
import 'firebase/database'

export function createAPI ({ config, version }: { config: any, version: any }) {
  Firebase.initializeApp(config)
  return Firebase.database().ref(version)
}

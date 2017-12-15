import {
  fetchUser,
  fetchItems,
  fetchIdsByType
} from '../api'

import { State } from './index';
import { ActionTree, ActionContext, Dispatch, Commit } from "vuex";

// type Partial<T> = {
//     [P in keyof T]?: T[P];
// }

// type PartialActionContext<S, R> = Partial<ActionContext<S, R>>

// interface PartialActionContext<S, R> {
//   dispatch?: Dispatch;
//   commit?: Commit;
//   state?: S;
//   getters?: any;
//   rootState?: R;
//   rootGetters?: any;
// }

export default <ActionTree<State, any>>{
  // ensure data for rendering given list type
  FETCH_LIST_DATA: ({ commit, dispatch, state }: any, { type }: any) => {
    commit('SET_ACTIVE_TYPE', { type })
    return fetchIdsByType(type)
      .then(ids => commit('SET_LIST', { type, ids }))
      .then(() => dispatch('ENSURE_ACTIVE_ITEMS'))
  },

  // ensure all active items are fetched
  ENSURE_ACTIVE_ITEMS: ({ dispatch, getters }: any) => {
    return dispatch('FETCH_ITEMS', {
      ids: getters.activeIds
    })
  },

  FETCH_ITEMS: ({ commit, state }: any, { ids }: any) => {
    // on the client, the store itself serves as a cache.
    // only fetch items that we do not already have, or has expired (3 minutes)
    const now = Date.now()
    ids = ids.filter((id: any) => {
      const item = state.items[id]
      if (!item) {
        return true
      }
      if (now - item.__lastUpdated > 1000 * 60 * 3) {
        return true
      }
      return false
    })
    if (ids.length) {
      return fetchItems(ids).then(items => commit('SET_ITEMS', { items }))
    } else {
      return Promise.resolve()
    }
  },

  FETCH_USER: ({ commit, state }: any, { id }: any) => {
    return state.users[id]
      ? Promise.resolve(state.users[id])
      : fetchUser(id).then(user => commit('SET_USER', { id, user }))
  }
}

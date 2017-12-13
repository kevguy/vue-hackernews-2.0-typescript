import Vue from 'vue'

export default {
  SET_ACTIVE_TYPE: (state: any, { type }: { type: any }) => {
    state.activeType = type
  },

  SET_LIST: (state: any, { type, ids }: { type: any, ids: any }) => {
    state.lists[type] = ids
  },

  SET_ITEMS: (state: any, { items }: { items: any }) => {
    items.forEach((item: any) => {
      if (item) {
        Vue.set(state.items, item.id, item)
      }
    })
  },

  SET_USER: (state: any, { id, user }: { id: any, user: any}) => {
    Vue.set(state.users, id, user || false) /* false means user not found */
  }
}

import Vue from 'vue';

export default {
  SET_ACTIVE_TYPE: (state: State, { type }: { type: string }) => {
    state.activeType = type;
  },

  SET_LIST: (state: State, { type, ids }: { type: string, ids: Array<number> }) => {
    state.lists[type] = ids;
  },

  SET_ITEMS: (state: State, { items }: { items: any }) => {
    items.forEach((item: any) => {
      if (item) {
        Vue.set(state.items, item.id, item);
      }
    });
  },

  SET_USER: (state: State, { id, user }: { id: number, user: any}) => {
    Vue.set(state.users, id, user || false); /* false means user not found */
  }
};

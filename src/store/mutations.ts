import Vue from 'vue';

import { State , Item } from './index';

interface SetActiveTypePayload { type: string };

interface SetListPayload { type: string, ids: Array<number> };

interface SetItemsPayload { items: Array<Item> };

interface SetUserPayload { id: number; user: any; };

export default {
  SET_ACTIVE_TYPE: (state: State, { type }: SetActiveTypePayload) => {
    state.activeType = type;
  },

  SET_LIST: (state: State, { type, ids }: SetListPayload) => {
    state.lists[type] = ids;
  },

  SET_ITEMS: (state: State, { items }: SetItemsPayload) => {
    items.forEach((item) => {
      if (item) {
        Vue.set(state.items, item.id, item);
      }
    });
  },

  SET_USER: (state: State, { id, user }: SetUserPayload) => {
    Vue.set(state.users, id, user || false); /* false means user not found */
  }
};

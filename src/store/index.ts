import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

export function createStore () {
  return new Vuex.Store({
    state: {
      activeType: null,
      itemsPerPage: 20,
      items: {/* [id: number]: Item */},
      users: {/* [id: string]: User */},
      lists: {
        top: [/* number */],
        new: [],
        show: [],
        ask: [],
        job: []
      }
    },
    actions,
    mutations,
    getters
  });
}

export interface List {
  top: Array<number>;
  new: Array<number>;
  show: Array<number>;
  ask: Array<number>;
  job: Array<number>;
  [key: string]: Array<number>;
};

export interface State {
  activeType: string | null;
  itemsPerPage: number;
  items: any;
  users: any;
  lists: List;
  route?: any;
};

export interface Item {
  by: string;
  descendants: number;
  id: number;
  kids: Array<number>,
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
  __lastUpdated: number;
};

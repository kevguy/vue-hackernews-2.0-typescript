import ItemList from './ItemList.vue'
import { Store } from 'vuex';
import { State } from '../store/index';

const camelize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

// This is a factory function for dynamically creating root-level list views,
// since they share most of the logic except for the type of items to display.
// They are essentially higher order components wrapping ItemList.vue.
export default function createListView (type: string) {
  return {
    name: `${type}-stories-view`,

    asyncData ({ store }: { store: Store<State> }) {
      return store.dispatch('FETCH_LIST_DATA', { type })
    },

    title: camelize(type),

    render (h: any) {
      return h(ItemList, { props: { type }})
    }
  }
}

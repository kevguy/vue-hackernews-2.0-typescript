import { GetterTree, Getter } from 'vuex';
import { State } from './index';


export default <GetterTree<State, any>>{
  // ids of the items that should be currently displayed based on
  // current list type and current pagination
  activeIds (state: State) {
    const { activeType, itemsPerPage, lists } = state

    if (!activeType) {
      return []
    }

    const page = Number(state.route.params.page) || 1
    const start = (page - 1) * itemsPerPage
    const end = page * itemsPerPage

    return lists[activeType].slice(start, end)
  },

  // items that should be currently displayed.
  // this Array may not be fully fetched.
  activeItems (state: State, getters: any) {
    return getters.activeIds.map((id: number) => state.items[id]).filter((_: any) => _)
  }
}

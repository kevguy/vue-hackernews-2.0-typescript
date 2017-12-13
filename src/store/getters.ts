export default {
  // ids of the items that should be currently displayed based on
  // current list type and current pagination
  activeIds (state: any) {
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
  activeItems (state: any, getters: any) {
    return getters.activeIds.map((id: any) => state.items[id]).filter((_: any) => _)
  }
}

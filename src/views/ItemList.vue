<template>
  <div class="news-view">
    <div class="news-list-nav">
      <router-link v-if="page > 1" :to="'/' + type + '/' + (page - 1)">&lt; prev</router-link>
      <a v-else class="disabled">&lt; prev</a>
      <span>{{ page }}/{{ maxPage }}</span>
      <router-link v-if="hasMore" :to="'/' + type + '/' + (page + 1)">more &gt;</router-link>
      <a v-else class="disabled">more &gt;</a>
    </div>
    <transition :name="transition">
      <div class="news-list" :key="displayedPage" v-if="displayedPage > 0">
        <transition-group tag="ul" name="item">
          <item v-for="item in displayedItems" :key="item.id" :item="item">
          </item>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { watchList } from '../api'
import Item from '../components/Item.vue'

export default {
  name: 'item-list',

  components: {
    Item
  },

  props: {
    type: String
  },

  data () {
    return {
      transition: 'slide-right',
      displayedPage: Number((this as any).$route.params.page) || 1,
      displayedItems: (this as any).$store.getters.activeItems
    }
  },

  computed: {
    page () {
      return Number((this as any).$route.params.page) || 1
    },
    maxPage () {
      const { itemsPerPage, lists } = (this as any).$store.state
      return Math.ceil(lists[(this as any).type].length / itemsPerPage)
    },
    hasMore () {
      return (this as any).page < (this as any).maxPage
    }
  },

  beforeMount () {
    if ((this as any).$root._isMounted) {
      (this as any).loadItems((this as any).page)
    }
    // watch the current list for realtime updates
    (this as any).unwatchList = watchList((this as any).type, (ids: any) => {
      (this as any).$store.commit('SET_LIST', { type: (this as any).type, ids })
      (this as any).$store.dispatch('ENSURE_ACTIVE_ITEMS').then(() => {
        (this as any).displayedItems = (this as any).$store.getters.activeItems
      })
    })
  },

  beforeDestroy () {
    (this as any).unwatchList()
  },

  watch: {
    page (to: any, from: any) {
      (this as any).loadItems(to, from)
    }
  },

  methods: {
    // loadItems (to = (this as any).page, from = -1) {
    loadItems (to: any, from = -1) {
      (this as any).$bar.start()
      (this as any).$store.dispatch('FETCH_LIST_DATA', {
        type: (this as any).type
      }).then(() => {
        if ((this as any).page < 0 || (this as any).page > (this as any).maxPage) {
          (this as any).$router.replace(`/${(this as any).type}/1`)
          return
        }
        (this as any).transition = from === -1
          ? null
          : to > from ? 'slide-left' : 'slide-right';
        (this as any).displayedPage = to
        (this as any).displayedItems = (this as any).$store.getters.activeItems
        (this as any).$bar.finish()
      })
    }
  }
}
</script>

<style lang="stylus">
.news-view
  padding-top 45px

.news-list-nav, .news-list
  background-color #fff
  border-radius 2px

.news-list-nav
  padding 15px 30px
  position fixed
  text-align center
  top 55px
  left 0
  right 0
  z-index 998
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  a
    margin 0 1em
  .disabled
    color #ccc

.news-list
  position absolute
  margin 30px 0
  width 100%
  transition all .5s cubic-bezier(.55,0,.1,1)
  ul
    list-style-type none
    padding 0
    margin 0

.slide-left-enter, .slide-right-leave-to
  opacity 0
  transform translate(30px, 0)

.slide-left-leave-to, .slide-right-enter
  opacity 0
  transform translate(-30px, 0)

.item-move, .item-enter-active, .item-leave-active
  transition all .5s cubic-bezier(.55,0,.1,1)

.item-enter
  opacity 0
  transform translate(30px, 0)

.item-leave-active
  position absolute
  opacity 0
  transform translate(30px, 0)

@media (max-width 600px)
  .news-list
    margin 10px 0
</style>

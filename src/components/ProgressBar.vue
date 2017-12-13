<!-- borrowed from Nuxt! -->

<template>
  <div class="progress" :style="{
    'width': percent+'%',
    'height': height,
    'background-color': canSuccess? color : failedColor,
    'opacity': show ? 1 : 0
  }"></div>
</template>

<script lang="ts">
export default {
  data () {
    return {
      percent: 0,
      show: false,
      canSuccess: true,
      duration: 3000,
      height: '2px',
      color: '#ffca2b',
      failedColor: '#ff0000',
    }
  },
  methods: {
    start () {
      (this as any).show = true
      (this as any).canSuccess = true
      if ((this as any)._timer) {
        clearInterval((this as any)._timer)
        (this as any).percent = 0
      }
      (this as any)._cut = 10000 / Math.floor((this as any).duration)
      (this as any)._timer = setInterval(() => {
        (this as any).increase((this as any)._cut * Math.random())
        if ((this as any).percent > 95) {
          (this as any).finish()
        }
      }, 100)
      return this
    },
    set (num) {
      (this as any).show = true
      (this as any).canSuccess = true
      (this as any).percent = Math.floor(num)
      return this
    },
    get () {
      return Math.floor((this as any).percent)
    },
    increase (num) {
      (this as any).percent = (this as any).percent + Math.floor(num)
      return this
    },
    decrease (num) {
      (this as any).percent = (this as any).percent - Math.floor(num)
      return this
    },
    finish () {
      (this as any).percent = 100
      (this as any).hide()
      return this
    },
    pause () {
      clearInterval((this as any)._timer)
      return this
    },
    hide () {
      clearInterval((this as any)._timer)
      (this as any)._timer = null
      setTimeout(() => {
        (this as any).show = false
        (this as any).$nextTick(() => {
          setTimeout(() => {
            (this as any).percent = 0
          }, 200)
        })
      }, 500)
      return this
    },
    fail () {
      (this as any).canSuccess = false
      return this
    }
  }
}
</script>

<style scoped>
.progress {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 2px;
  width: 0%;
  transition: width 0.2s, opacity 0.4s;
  opacity: 1;
  background-color: #efc14e;
  z-index: 999999;
}
</style>

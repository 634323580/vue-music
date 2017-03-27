<template>
    <div class="better-scroll" ref="betterScroll">
        <div class="scroll-content" :style="scrollStyle">
          <slot>当前列表为空</slot>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import Bus from '@/common/js/bus.js'
export default {
  name: 'usersub',
  props: {
      scrollStyle: {
        type: Object,
        default () {
          return {}
        }
      }
  },
  mounted () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.betterScroll, {
            click: true
          })
        Bus.$on('resetScroll', () => {
          setTimeout(() => {
            this.scroll.refresh()
          })
        })
      })
  }
}
</script>
<style lang="scss" scoped>
.better-scroll{
    position: absolute;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    overflow:hidden;
}
</style>

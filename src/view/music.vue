<template>
  <!--scroll滚动组件，使用slot内容分发把内容传过去-->
    <div class="music-wrapper">
      <scroll :pullup='true' ref="scroll" @scrollToEnd='end()'>
        <ul class="music">
          <usersub></Usersub>
          <sheet :scroll='scrollComponent' ref="sheet"></sheet>
        </ul>
      </scroll>
      <!--<lately></lately>-->
    </div>
</template>

<script>
  import Usersub from '@/components/Usersub/Usersub'
  import Sheet from '@/components/Sheet/Sheet'
  import Scroll from '@/components/scroll/scroll'
  // import Bus from '@/common/js/bus.js'
  // import lately from '../components/lately/lately'
  export default {
    data () {
      return {
        scrollComponent: ''
      }
    },
    created () {
      this.$nextTick(() => {
        this.scrollComponent = this.$refs.scroll
      })
    },
    activated () {
      // setTimeout(() => {
      //   // Bus.$emit('resetScroll')
      //   console.log('进入')
      //   this.$refs.scroll.refresh()
      // }, 200)
    },
    methods: {
      end() {
        console.log('到底了')
      }
    },
    components: {
      Usersub,
      Sheet,
      Scroll
      // lately
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.music{
  padding: 55px 0 45px;
}
.music-wrapper{
  height: 100%;
}
</style>

<template>
  <!--scroll滚动组件，使用slot内容分发把内容传过去-->
    <div class="music-wrapper">
      <scroll :pullup='true' @scrollToEnd='end()'>
        <ul class="music">
          <usersub></Usersub>
          <sheet ref="sheet"></sheet>
        </ul>
      </scroll>
      <!--<lately></lately>-->
    </div>
</template>

<script>
  import Usersub from '@/components/Usersub/Usersub'
  import Sheet from '@/components/Sheet/Sheet'
  import Scroll from '@/components/scroll/scroll'
  import Bus from '@/common/js/bus.js'
  // import lately from '../components/lately/lately'
  export default {
    activated () {
      setTimeout(() => {
        Bus.$emit('resetScroll')
      }, 200)
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

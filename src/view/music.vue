<template>
  <!--scroll滚动组件，使用slot内容分发把内容传过去-->
    <scroll :pullup='true' @scrollToEnd='end()'>
      <ul class="music">
        <usersub></Usersub>
        <sheet></sheet>
      </ul>
    </scroll>
</template>

<script>
  import Usersub from '@/components/Usersub/Usersub'
  import Sheet from '@/components/Sheet/Sheet'
  import Scroll from '@/components/scroll/scroll'
  export default {
    data () {
      return {
        scrollStyle: {
          paddingTop: 55 + 'px',
          paddingBottom: 45 + 'px'
        }
      }
    },
    created () {
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.music{
  padding: 55px 0 45px;
}
</style>

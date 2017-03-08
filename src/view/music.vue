<template>
  <!--scroll滚动组件，使用slot内容分发把内容传过去-->
    <scroll>
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
      return {}
    },
    created () {
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
</style>

<template>
  <div class="music">
    <Usersub></Usersub>
    <Sheet></Sheet>
  </div>
</template>

<script>
  import Usersub from '@/components/Usersub/Usersub'
  import Sheet from '@/components/Sheet/Sheet'
  export default {
    data () {
      return {}
    },
    components: {
      Usersub,
      Sheet
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

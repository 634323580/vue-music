<template>
  <div class="better-scroll" ref="betterScroll">
    <ul class="music">
        <Usersub></Usersub>
        <Sheet ref="sheet"></Sheet>
      </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Usersub from '@/components/Usersub/Usersub'
  import Sheet from '@/components/Sheet/Sheet'
  export default {
    data () {
      return {}
    },
    created () {
      this.$nextTick(() => {
        this.$refs.sheet.$on('scroll', () => {
          setTimeout(() => {
            this.scroll = new BScroll(this.$refs.betterScroll, {
                click: true
              })
          })
        })
        this.$refs.sheet.$on('resetScroll', () => {
          setTimeout(() => {
            this.scroll.refresh()
          })
        })
      })
    },
    components: {
      Usersub,
      Sheet
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .music{
      padding-top: 55px;
    }
</style>

<template>
  <div class="music-scroll" ref="musicScroll">
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
          this.scroll = new BScroll(this.$refs.musicScroll, {
              click: true
            })
        })
        this.$refs.sheet.$on('resetScroll', () => {
          this.scroll.refresh()
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
    .music-scroll{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    .music{
      padding-top: 55px;
    }
</style>

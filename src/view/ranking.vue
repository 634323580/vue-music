<template>
  <div class="ranking-wraper">
    <div v-show="load" class="loading-wrapper">
      <loading></loading>
    </div>
      <toplist v-show="!load" ref='toplist' @loadHide='loadHide()'></toplist>
      <router-view></router-view>
  </div>
</template>

<script>
  import toplist from '../components/toplist/toplist'
  import loading from '../components/loading/loading'
  import Bus from '../common/js/bus'
  export default {
    data () {
      return {
        load: true  
      }
    },
    activated () {
      Bus.$emit('resetScroll')
    },
    methods: {
      loadHide() {
        this.load = false
      }
    },
    components: {
      toplist,
      loading
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../common/scss/var';
.ranking-wraper{
  height: 100%;
  overflow: hidden;
  background: #fff;
}
.loading-wrapper{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
</style>

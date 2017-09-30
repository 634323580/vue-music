<template>
    <div class="mode" @click="changeMode()">
        <span>
            <!--列表循环-->
            <i class="iconfont" :style="{fontSize: size + 'px' }" v-html="setCurrentMode === 0 ? '&#xe65f;': setCurrentMode === 1 ? '&#xe628;' : '&#xe78a;'"></i>
            <span class="title" v-if="title">{{setCurrentMode === 0 ? '列表循环': setCurrentMode === 1 ? '随机播放' : '单曲循环'}}</span>
        </span>
    </div>
</template>
<script>
import utils from '../../common/js/utils'
import { mapState } from 'vuex'
export default {
    props: {
        title: {
            type: Boolean,
            default: false
        },
        size: {
            default: '25'
        }
    },
    data() {
        return {
            currentMode: utils.getStorage('currentMode', 0)
        }
    },
    created() {
        this.$store.commit('setCurrentMode', this.currentMode)
    },
    methods: {
        changeMode() {
            if (this.currentMode === 2) {
                this.currentMode = 0
            } else {
                this.currentMode = this.currentMode + 1
            }
            localStorage.currentMode = this.currentMode
            this.$store.commit('setCurrentMode', this.currentMode)
        }
    },
    computed: {
        ...mapState({
            setCurrentMode: state => {
                return state.currentMode
            }
        })
    }
}
</script>
<style lang="scss" scoped>
.title,.iconfont{
    vertical-align: middle;
}
</style>

<template>
    <div class="cd-wrapper" :class="{play: play, paused: !play}">
        <div class="cd" :class="{rotatePlay: true, rotatePaused: !play}">
            <div class="cd-img">
                <img :src="songDetail.pic_radio" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        play: {
            type: Boolean,
            default: false
        },
        songDetail: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    created () {
    },
    watch: {
        songDetail() {
        console.log(this.songDetail)
        }
    }
}
</script>
<style lang="scss" scoped>
.cd-wrapper{
    position: relative;
    padding-top: 40px;
    overflow: hidden;
    &:after{
        content: '';
        display: block;
        top: 0;
        left: 50%;
        width: 90px;
        height: 110px;
        position: absolute; 
        background: url('./images/needle-plus.png') no-repeat;
        background-size: contain;
        z-index: 5;
        transform-origin: left top;
        transition: .5s ease;
        transform: rotate(-25deg)
    }
    &.play{
        &:after{
            transform: rotate(0)
        }
    }
}
.cd{
    position: relative;
    width: 70%;
    padding-bottom: 70%;
    margin: 0 auto;
     &:before, &:after{
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
     }
    &:before{
        background: url('http://s3.music.126.net/m/s/img/disc.png?d3bdd108') no-repeat center;
        background-size: contain;
        z-index: 2;
    }
    &:after{
        background: url('./images/cd_light.png') no-repeat center;
        background-size: contain;
        z-index: 23;
    }
    .cd-img{
        position: absolute;
        z-index: 1;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        width: 63%;
        height: 63%;
        img{
            width: 100%;
        }
    }
}
// @keyframes rotate {
//     0% {
//         transform: rotate(0 deg);
//         transform: rotate(0 deg);
//     }
//     to {
//         transform: rotate(1turn);
//         transform: rotate(1turn);
//     } 
// }
</style>

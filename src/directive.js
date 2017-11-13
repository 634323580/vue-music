import Vue from 'vue'
const focus = Vue.directive('focus', {
    // 当元素插入到DOM
    inserted: function (el) {
        // 聚焦元素
        el.focus()
    }
})
export {focus}

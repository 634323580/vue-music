// 过滤器
  exports.secToTime = (s) => {
    // 返回处理后的值
    let t = ''
    if (s > -1) {
      // let hour = Math.floor(s / 3600)
      // 计算有多少分钟
      let min = Math.floor(s / 60) % 60
      // 计算有多少秒
      let sec = s % 60
      // if (hour < 10) {
      //     t = '0' + hour + ":"
      // } else {
      //     t = hour + ":"
      // }
      // 小于10分钟前面补0
      if (min < 10) { t += "0" }
      t += min + ":"
      // 小于10秒前面补0
      if (sec < 10) { t += "0" }
      // 四舍五入
      t += Math.round(sec)
    }
    return t
  }

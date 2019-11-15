/* 格式化时间 */
function friendlyDate(dataStr) {
  let dateObj = typeof dataStr === 'object' ? dataStr : new Date(dataStr)
  let time = dateObj.getTime()
  let now = Date.now()
  let space = now - time
  let str = ''

  switch (true) {
    //1分钟前
    case space < 60000:
      str = '刚刚'
      break
    
    //1小时前
    case space < 1000*3600:
      str = Math.floor(space/60000) + '分钟前'
      break
     
    //1天前
    case space < 1000*3600*24:
      str = Math.floor(space/(1000*3600)) + '小时前'
      break
    default:
      str = Math.floor(space/(1000*3600*24)) + '天前'
  }
  return str
}

export default {
  // 创建插件 使Vue的实例都可以使用格式化时间函数
  install(Vue, options) {
    Vue.prototype.friendlyDate = friendlyDate
  }
}

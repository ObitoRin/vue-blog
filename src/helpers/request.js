import axios from 'axios'
import { Message } from 'element-ui'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'https://blog-server.hunger-valley.com'

export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type
    }
    if(type.toLowerCase() === 'get') {
      option.params = data
    }else {
      option.data = data
    }

    //jwt鉴权机制：登录过后服务器会返回一个token加密字符串给浏览器，如果有下次请求的时候会手动带上这个token加密串发送服务器，服务器再做校验
    if(localStorage.token){
      axios.defaults.headers.common['Authorization'] = localStorage.token
    }

    axios(option).then(res => {
      console.log(res.data)
      if(res.data.status === 'ok') {
        if(res.data.token){
          localStorage.token = res.data.token
        }
        resolve(res.data)
      }else{
        Message.error(res.data.msg)
        reject(res.data)
      }
    }).catch(err => {
      Message.error('网络异常')
      reject({ msg: '网络异常' })
    })
  })
}


// request('/auth/login', 'POST', {username: 'hunger', password: '123456'})
//   .then(data=>{
//     console.log(data)
//   })
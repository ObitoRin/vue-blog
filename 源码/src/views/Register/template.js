import { mapActions } from 'vuex';
export default {
    data(){
        return {
            //绑定输入框的 用户名 密码
            username: '',
            password: ''
        }
    },
    methods: {
        ...mapActions(['register']),
        onRegister(){
            this.register({ username: this.username, password: this.password})
                //注册成功后跳转到首页
                .then(() => {
                    this.$router.push('/')
                })
        }
    }
  }
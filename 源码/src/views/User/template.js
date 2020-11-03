import blog from '../../api/blog'

export default {
    data(){
        return {
            blogs: [],  //博客数据列表
            user:{},    //用户信息
            page: 1,    //当前页数
            total: 0    //数据总条数
        }
    },

    //当组件创建时根据用户id获取对应的数据
    created(){
        this.userId = this.$route.params.userId
        this.page = this.$route.query.page || 1 //刷新后还在当前页
        blog.getBlogsByUserId( this.userId, { page: this.page })
            .then(res => {
                this.blogs = res.data
                this.page = res.page
                this.total = res.total

                //判断获取成功后有没有数据再获取用户信息
                if(res.data.length > 0){
                    this.user = res.data[0].user
                }
            })
    },

    methods:{
        //切换页面
        onPageChange(newPage) {
            //根据 用户id 和 当前点击的页数 获取博客信息
            blog.getBlogsByUserId(this.userId, { page : newPage })
                .then(res=>{
                    this.blogs = res.data
                    this.page = res.page
                    this.total = res.total
                    //跳转到当前id的用户页面，添加page参数
                    this.$router.push({ path: `/user/${this.userId}`, query: { page: this.page}})
                })
        },

        //分隔时间
        splitDate(dataStr){
            let dateObj = typeof dataStr ==='object' ? dataStr : new Date(dataStr)
            return {
                date: dateObj.getDate(),
                month: dateObj.getMonth() + 1,
                year: dateObj.getFullYear()
            }
        }
    }
  }
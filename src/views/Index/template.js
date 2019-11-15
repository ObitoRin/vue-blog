import blog from '../../api/blog'
export default {
    data(){
        return {
            blogs: [], //首页详情数据
            total: 0,  //总条数
            page: 1    //页数
        }
    },
    //组件刚创建的时候获取对应页数的数据，再给blogs渲染到页面
    created() {
        //刷新后还在当前页:   当前路由的页数
        this.page = parseInt(this.$route.query.page) || 1
        blog.getIndexBlogs({ page: this.page }).then(res=>{
            this.blogs = res.data
            this.total = res.total
            this.page = res.page
        })
    },
    methods: {
        //点击切换页面
        onPageChange(newPage){
            //console.log(newPage) 当前点击的页数
            //获取页数获取首页数据
            blog.getIndexBlogs({ page: newPage }).then(res=>{
                this.blogs = res.data
                this.total = res.total
                this.page = res.page
                //跳转到首页再添加个query参数
                this.$router.push({path: '/', query: { page: this.page }})
            })
        }
    }
  }
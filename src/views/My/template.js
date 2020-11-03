import blog from '../../api/blog';
import { mapGetters } from 'vuex';
export default {
    data(){
        return {
            blogs: [],  //博客数据列表
            page: 1,    //当前页数
            total: 0    //数据总条数
        }
    },

    // 获取vuex中getter中的user信息
    computed:{
        ...mapGetters(['user'])
    },
    
    //当组件创建时根据用户id获取对应的数据
    created(){    
        this.page = parseInt(this.$route.query.page) || 1   //刷新后还在当前页面
        blog.getBlogsByUserId(this.user.id, {page: this.page})
            .then(res=>{
                this.blogs = res.data
                this.page = res.page
                this.total = res.total
            })
    },

    methods:{
        onPageChange(newPage){
            //根据 用户id和当前页数 获取对应的数据
            blog.getBlogsByUserId(this.user.id, {page: newPage})
                .then(res=>{
                    this.blogs = res.data
                    this.page = res.page
                    this.total = res.total
                    //路由跳转到my再添加个query参数
                    this.$router.push({path: '/my' , query: { page: this.page }})
                })
        },

        //根据博客数据的id删除数据
        async onDelete(blogId){
            await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              })
            //点击确定执行以下操作
            await blog.deleteBlog( {blogId })
            //弹框删除成功
            this.$message({type: 'success',message: '删除成功!'})
            //删除成功后直接消失：遍历博客数据列表，返回数据列表中id不是被删除id的数据
            //this.blogs = this.blogs.filter(blog => blog.id != blogId) 
            //删除成功后再获取博客数据
            let res = await blog.getBlogsByUserId(this.user.id, {page: this.page})           
            this.blogs = res.data
            this.page = res.page
            this.total = res.total
            
             /*this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => { //点击确定执行以下操作
                blog.deleteBlog({blogId}).then(()=>{
                    //弹框删除成功
                    this.$message({type: 'success',message: '删除成功!'})                     
    
                    //删除成功后直接消失：遍历博客数据列表，返回数据列表中id不是被删除id的数据
                    this.blog = this.blogs.filter(blog => blog.id != blogId)                   
                })               
              }) */
        },

        //转换时间格式
        splitDate(dataStr){
            let dateStr = dataStr === 'object' ? dataStr : new Date(dataStr)
            return {
                date: dateStr.getDate(),
                month: dateStr.getMonth() + 1,
                year: dateStr.getFullYear()
            }
        }
    }
  }
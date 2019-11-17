import marked from 'marked'
import blog from '../../api/blog'

export default {
    data() {
        return {
            title: '',      //文章标题
            rawContent: '', //原始内容
            user: {},       //用户信息
            createdAt: ''   //创建时间
        }
    },

    // 当组件创建时根据id获取对应的博客详情
    created(){
        this.blogId = this.$route.params.blogId  //路由设计好的对应id参数， 在$route.param中获取参数
        blog.getDetail({ blogId: this.blogId }).then(res=>{
            this.title = res.data.title
            this.rawContent = res.data.content
            this.user = res.data.user
            this.createdAt = res.data.createdAt
        })
    },

    computed: {
        // 调用 marked api把原始内容转为 markdown 格式
        markdown(){
           return marked(this.rawContent)
        }
    }
  }
import blog from '../../api/blog'
export default {
    data(){
        return {
            title: '',                 //文章标题
            description: '',           //内容简介
            content: '',               //文章内容
            titleMaxLength: 30,        //标题限制
            descriptionMaxLength: 200, //简介限制
            contentMaxLength: 20000    //内容限制
        }
    },

    //当组件创建时根据博客数据的id获取对应的编辑页面
    created(){
        this.blogId = this.$route.params.blogId
        blog.getDetail({blogId: this.blogId}).then(res=>{
            this.title = res.data.title
            this.description = res.data.description
            this.content = res.data.content
        })
    },

    methods: {
        onEdit(){
            //根据博客id编辑对应的博客文章
            blog.updateBlog({ blogId: this.blogId }, { title: this.title, description: this.description, content: this.content })
                .then(res => {
                    this.$message.success(res.msg)                    
                    this.$router.push({ path: `/detail/${this.blogId}`})
                })                                       
        },
        
        onInput(){
            if (this.title.length > this.titleMaxLength) {
                this.$message.warning('标题不能超过' + this.titleMaxLength + '个字')
                this.title = this.title.substr(0, this.titleMaxLength)                      
                this.$refs.title.selectionEnd = this.title.length                                
            }
           
            if (this.description.length > this.descriptionMaxLength) {
                this.$message.warning('简介不能超过' + this.descriptionMaxLength + '个字')
                this.description = this.description.substr(0, this.descriptionMaxLength)
                this.$refs.description.selectionEnd = this.description.length
            }

            if (this.content.length > this.contentMaxLength) {
                this.$message.warning('内容不能超过' + this.contentMaxLength + '个字')
                this.content = this.content.substr(0, this.contentMaxLength)
                this.$refs.content.selectionEnd = this.content.length
            }
        }
    }
  }
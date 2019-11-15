import blog from '../../api/blog'

export default {
    data(){
        return {
            title: '',                 //标题
            description: '',           //内容简介
            content: '',               //内容文章
            atIndex: false,            //是否展示到首页
            titleMaxLength: 30,        //标题限制
            descriptionMaxLength: 200, //简介限制
            contentMaxLength: 20000    //内容限制
                        
        }
    },
    methods: {
        onCreate(){
            //创建博客
            blog.createBlog({ title: this.title, description: this.description, content: this.content, atIndex: this.atIndex })
                .then(res => {
                    //提示成功，跳转到当前文章的详情页
                    this.$message.success(res.msg)
                    this.$router.push({ path: `/detail/${res.data.id}` })
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
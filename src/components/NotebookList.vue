<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#"  @click.prevent="onCreate"> <el-button size="mini">添加笔记本</el-button> </a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{notebooks.length}})</h3>
        <div class="book-list" >
          
          <router-link  v-for="notebook in notebooks" :to=" `/note?notebookId=${notebook.id}` " class="notebook" :key="notebook.id">
            <div >
              <span class="iconfont icon-notebook"></span> {{notebook.title}} 
              <span>{{notebook.noteCounts}}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>  
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>  
              <span class="date">{{notebook.friendlyCreatedAt}}</span>              
            </div>
          </router-link>              
        </div>       
      </div>

    </main>

  </div>
</template>
<script>
import Auth from '@/apis/auth'
import Notebooks from '@/apis/notebooks'
import { noteDate } from '@/helpers/notedate'
import { mapState,mapActions,mapGetters } from 'vuex';

// export default {
//   computed: {
//     ...mapState([
//       'nameOfState',
//     ])
//   },
// };

//window.Notebooks = Notebooks

export default {
  data () {
    return {
      //notebooks: []
    }
  },

  created() {
    this.checkLogin({path:'/login'})
    // Auth.getInfo()
    //   .then(res => {
    //     if(!res.isLogin) {
    //       this.$router.push({path: '/login'})
    //     }
       
    //   })

    // Notebooks.getAll()         //获取笔记本列表
    //   .then(res => {
    //     console.log(res)
    //     this.notebooks = res.data
    //   })
    this.getNotebooks() //获取笔记本列表
  },
  computed:{
     ...mapGetters(['notebooks']),
    //等价于
    // notebooks(){
    //   return this.$store.getters.notebooks
    // }
  },


  methods: {
    ...mapActions([
      'getNotebooks',
      'addNotebook',
      'updateNotebook',
      'deleteNotebook',
      'checkLogin'
      ]),
    //将this.addNotebook 映射为 this.$store.dispatch('addNotebook')
    onCreate() {
      this.$prompt('输入新笔记本标题', '创建笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{1,30}$/,
          inputErrorMessage: '标题不能为空，且不超过30个字符'
        }).then(({ value }) => {
          this.addNotebook({title: value})
          //return Notebooks.addNotebook({ title: value })
        })
        // .then(res => {
        //   res.data.friendlyCreatedAt = noteDate(res.data.createdAt)
        //   this.notebooks.unshift(res.data)
        //   this.$message.success(res.msg)
        // })
    },

    onEdit(notebook) {
      let title = ''
      this.$prompt('输入新笔记本标题', '修改笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{1,30}$/,
          inputValue: notebook.title,
          inputErrorMessage: '标题不能为空，且不超过30个字符'
        }).then(({ value }) => {
          this.updateNotebook({notebookId:notebook.id,title:value})
         // title = value
          //return Notebooks.updateNotebook(notebook.id, { title })
        })
        // .then(res => {
        //   notebook.title = title
        //   this.$message.success(res.msg)
        // })
    },

    onDelete(notebook) {
      this.$confirm('确认要删除笔记本吗', '删除笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteNotebook({notebookId:notebook.id})

        })
        // .then(res => {
        //   this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
        //   this.$message.success(res.msg)
        // })
    }
  }
}
</script>

<style lang="less" scoped>
  @import url(../assets/css/notebook-list.less);
</style>

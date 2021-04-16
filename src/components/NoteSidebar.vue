<template>
  <div class="note-sidebar">
    <el-button class="btn add-note"  plain @click="onAddNote">添加笔记</el-button>
<!--    <span class="btn add-note" @click="onAddNote">添加笔记</span>-->
    <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{ curBook.title }}
        <svg class="icon iconfont" aria-hidden="true">
        <use xlink:href="#icon-down"></use>
      </svg>
      </span>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item
          v-for="(notebook) in notebooks"
          :command="notebook.id"
          :key="notebook.id"
          >{{ notebook.title }}
        </el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes" :key="note.id">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
          <span class="date">{{ note.updatedAtFriendly }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Notebooks from "@/apis/notebooks";
import Notes from "@/apis/notes";
import Bus from "@/helpers/bus"
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'

window.Notes = Notes

export default {
  

  created() { 
    this.getNotebooks()
      .then(() => {
        this.setCurBook({curBookId:this.$route.query.notebookId})
        //this.$store.commit('setCurBook',{curBookId:this.$route.query.notebookId})
       return this.getNotes({notebookId:this.curBook.id})
      }).then(()=>{
        this.setCurNote({curNoteId:this.$route.query.noteId})
        this.$router.replace({         //进入笔记本页面后选中一个笔记
          path:'/note',
          query:{
            noteId:this.curNote.id,
            noteBookId:this.curBook.id
          }
        })
       // this.$store.commit('setCurNote',{curNoteId:this.$route.query.noteId})
      })

    // Notebooks.getAll().then((res) => {            //获取所有笔记本列表
    //   this.notebooks = res.data;
    //   this.curBook = this.notebooks.find(notebook => notebook.id == this.$route.query.notebookId)  // == 跳转到对应的笔记本
    //   || this.notebooks[0] || {}                                       //获取 当前页面
    //   return Notes.getAll({notebookId:this.curBook.id})
    // }).then(res =>{
    //   this.notes = res.data
    //   this.$emit('update:notes',this.notes)
    //   Bus.$emit('update:notes',this.notes)
    // })
  },

  data() {
    return {
      // notebooks: [],
      // notes: [],
      // curBook:{}   //当前笔记本
    };
  },
  computed:{
    ...mapGetters([
      'notebooks',
      'notes',
      'curBook',
      'curNote'
    ])
  },
methods: {
  ...mapMutations([
    'setCurBook',
    'setCurNote'
  ]),
  ...mapActions([
    'getNotebooks',
    'getNotes',
    'addNote'
  ]),
  handleCommand(notebookId){
    if(notebookId == 'trash'){
        return this.$router.push({path:'trash'})
    }
    this.$store.commit('setCurBook',{ curBookId:notebookId })
    this.getNotes({notebookId:this.curBook.id})
    .then(()=>{
      this.setCurNote()                      //切换笔记本时
      this.$router.replace({          //选中当前笔记的路由
        path:'/note',
        query:{
          noteId:this.curNote.id,
          notebookId:this.curBook.id
        }
      })
    })
   // this.curBook = this.notebooks.find(notebook => notebook.id == notebookId)
    //  Notes.getAll({notebookId})
    //   .then(res =>{
    //       this.notes = res.data
    //       this.$emit('update:notes',this.notes)
    //   })
  },
  onAddNote(){
     this.addNote({notebookId:this.curBook.id})
    //  .then(res =>{
    //    console.log(res)
    //    this.notes.unshift(res.data)
    //  })
       
     
  },
}
}
</script>

<style lang="less">
@import url(../assets/css/note-sidebar.less);
</style>

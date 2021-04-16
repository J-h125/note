<template>
  <div id='trash'  class="detail">
    <div class="note-sidebar">
    <h3 class="notebook-title">回收站</h3>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in trashNotes" :key="note.id">
        <router-link :to="`/trash?noteId=${note.id}`">
          <span class="date">{{ note.updatedAtFriendly }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
  <div class="note-detail">
    <div class="note-bar" v-if="true">
      <span>创建日期：{{curTrashNote.createdAtFriendly}}</span>
      <span>更新日期：{{curTrashNote.updatedAtFriendly}}</span>
      <span>所属笔记本：{{belongTo}}</span>

      <span class=" action" @click="onRevert"> <el-button size="mini">恢复</el-button></span>
      <span class=" action" @click="onDelete"> <el-button size="mini">彻底删除</el-button></span>
<!--      <a class="btn action" @click="onRevert">恢复</a>-->
<!--      <a class="btn action" @click="onDelete">彻底删除</a>-->
    </div>
    <div class="note-title">
      <span>{{curTrashNote.title}}</span>
    </div>
    <div class="editor">
      <div class="preview markdown-body" v-html="compileMarkdown"></div>
    </div>
  </div>
  </div>
</template>

<script>
import Auth from "@/apis/auth.js";
import MarkdownIt from 'markdown-it'
import Trash from '@/apis/trash'
import {mapActions,mapGetters,mapMutations} from 'vuex'
//window.Trash = Trash

let md = new MarkdownIt

export default {
  data() {
    return {
      //belongTo:'我的笔记本',
    };
  },
  created() {
    this.checkLogin({path:'/login'})
    this.getNotebooks()      //一开始就能显示所属笔记本
    this.getTrashNotes()
      .then(()=>{
        this.setCurTrashNote({curTrashNoteId:this.$route.query.noteId})
        this.$router.replace({               //切换到回收站 选中当前note url
          path:'/trash',
          query:{noteId:this.curTrashNote.id}
        }).catch(err=>err)
      })
  },
  computed:{
    ...mapGetters([
        'belongTo',
        'trashNotes',
        'curTrashNote'
    ]),
    compileMarkdown(){
      return md.render(this.curTrashNote.content || '')
    }
  },
  methods:{
    ...mapMutations([
       'setCurTrashNote'
    ]),
    ...mapActions([
        'checkLogin',
        'getTrashNotes',
        'deleteTrashNote',
        'revertTrashNote',
        'getNotebooks'
    ]),
    onDelete(){
      this.$confirm('此操作将永久删除该笔记, 是否继续?', '永久删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        return this.deleteTrashNote({noteId:this.curTrashNote.id})
      }).then(()=>{
        this.setCurTrashNote()           //不能为空
        console.log('revert')
        this.$router.replace({
          path:'/trash',
          query:{noteId:this.curTrashNote.id}
        })
      })

    },
    onRevert(){
      this.revertTrashNote({noteId:this.curTrashNote.id})
        .then(()=>{
          this.setCurTrashNote()           //不能为空
          console.log('revert')
          this.$router.replace({
            path:'/trash',
            query:{noteId:this.curTrashNote.id}
          })
        })
    },
  },
  beforeRouteUpdate(to,from,next){
    console.log(to)
    this.setCurTrashNote({curTrashNoteId:to.query.noteId})
    next()
  }
};
</script>
<style lang="less" scoped>
@import url(../assets/css/note-sidebar.less);
@import url(../assets/css/note-detail.less);

#trash{
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex:1;

  .note-bar{
    background: #eee;
    .action{
      float:right;
      margin-left:10px;
      padding:2px 4px;
      font-size:12px
    }
  }
}
</style> 

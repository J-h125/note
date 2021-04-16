<template>
  <div id="note" class="detail">
    <note-sidebar  @update:notes = " (val) => (notes = val) "></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期: {{ curNote.createdAtFriendly }}</span>
          <span> 更新日期: {{ curNote.updatedAtFriendly }}</span>
          <span> {{ statusText }}</span>
          <span class="iconfont icon-delete" @click='onDeleteNote'>
             <el-button size="mini"  icon="el-icon-delete"  @click='onDeleteNote'></el-button>
          </span>
         <span class="iconfont icon-fullscreen" @click="isShowPreview = !isShowPreview" >
            <el-button size="mini"   >预览</el-button>
         </span>
<!--          <span class="iconfont icon-delete" @click='onDeleteNote'></span>-->

<!--          <span class="iconfont icon-fullscreen" @click="isShowPreview = !isShowPreview" ></span>-->
        </div>
        <div class="note-title">
          <input type="text" v-model="curNote.title" @input="onUpdateNote" @keydown="statusText = '正在输入...'"  placeholder="输入标题"/>
        </div>
          
        <div class="editor">
          <textarea
            v-show="!isShowPreview"
           v-model="curNote.content"
            @input="onUpdateNote"
            @keydown="statusText = '正在输入...'"
            placeholder="输入内容, 支持 markdown 语法"
          ></textarea>
          <div
            class="preview markdown-body"
            v-html="previewContent"
            v-show="isShowPreview"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/apis/auth.js";
import NoteSidebar from "./NoteSidebar.vue";
import _ from 'lodash'
import MarkdownIt from 'markdown-it'
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'

let md = new MarkdownIt()

export default {
  components: {
    NoteSidebar,
  },
  data() {
    return {
      // curNote:{},
      // notes:[],
      statusText:'笔记未改动',
      isShowPreview:false
    };
  },
  created() {
    this.checkLogin({path:'/login'})
    // Auth.getInfo()
    // .then(res=>{
    //     if(!res.isLogin){
    //         this.$router.push({path:'/login'})
    //     }
    // })
  //   Bus.$once('update:notes',val => {
  //   this.curNote = val.find((note) => note.id == this.$route.query.noteId) || {}
  // })
  },
  

 
  computed:{
      ...mapGetters([
        'notes',
        'curNote'
      ]),

      previewContent(){           //预览markdown
        return md.render(this.curNote.content||'')
      }
  },
  methods:{
    ...mapMutations([
      'setCurNote'
    ]),
    ...mapActions([
      'updateNote',
      'deleteNote',
      'checkLogin'
    ]),
    onUpdateNote:_.debounce(function(){    //lodash   300ms不操作执行
        if(!this.curNote.id)return
        this.updateNote({noteId: this.curNote.id, title: this.curNote.title,content:this.curNote.content})
        .then(data =>{
          this.statusText = '已保存'
        }).catch(data=>{
           this.statusText = '保存出错'
        })
    },300),
    onDeleteNote(){
      this.deleteNote({ noteId:this.curNote.id})
      .then(data =>{
    //    this.notes.splice(this.notes.indexOf(this.curNote),1)
        this.$router.replace({path:'/note'})
      })
    }
  },
   beforeRouteUpdate (to, from, next) {   //路由更新
    console.log('beforeRouteUpdata')
    this.isShowPreview = false     //路由切换后默认为编辑模式
    this.setCurNote({curNoteId:to.query.noteId})
  //  this.curNote = this.notes.find((note) => note.id == to.query.noteId) || {}
    next()
  },

};
</script>

<style lang="less" scoped>


@import url(../assets/css/note-detail.less);

#note {
  display: flex;
  align-items: stretch;
  background-color: #e7eaed;
  flex: 1;
}
</style>

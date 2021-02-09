<template>
    <div id="notebook-list" class="detail">
        <header>
            <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i>新建笔记本</a>
        </header>
        <main>
            <div class="layout">
                <h3>笔记本列表{{notebooks.length}}</h3>
                <div class="book-list">
                    <router-link v-for="notebook in notebooks" :to="`/note?notebookId=${notebook.id}`" class="notebook" :key="notebook ">
                        <div>
                            <span class="iconfont icon-notebook"></span>{{notebook.title}}
                            <span>{{notebook.noteCount}}</span> 
                            <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
                            <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
                            <span class="date">{{notebook.noteCreateAt}}</span>
                        </div>
                    </router-link>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Auth from "@/apis/auth.js"
import Notebooks from "@/apis/notebooks.js"
import {noteDate} from "@/helpers/notedate"


export default {
    name:'NotebookList',
    data(){
        return{
           notebooks:[]
        }
    },
    created(){
   
        Auth.getInfo()
        .then(res=>{
            if(!res.isLogin){
                this.$router.push({path:'/login'})
            }
        })
        Notebooks.getAll()
        .then(res=>{
            this.notebooks = res.data;
        })
    },
    methods:{
        onCreate(){
            this.$prompt('请输入笔记本名称', '创建笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{1,30}$/,
          inputErrorMessage: '不能为空，且不超过30个字符'
        }).then(({ value }) => {
            return Notebooks.addNotebook({title:value})
        }).then(res => {
                res.data.noteCreateAt = noteDate(res.data.reateAt)
                this.notebooks.unshift(res.data)
                this.$message.success(res.msg)
            })
        },

        onEdit(notebook){
            let title = ''
        this.$prompt('请输入笔记本名称', '修改笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue:notebook.title,
          inputPattern: /^.{1,30}$/,
          inputErrorMessage: '不能为空，且不超过30个字符'
        }).then(({ value }) => {
            title = value
            return Notebooks.updateNotebook(notebook.id,{title})
        }).then(res => {
              notebook.title = title
                this.$message.success(res.msg)
            })

        },
        onDelete(notebook){
             this.$confirm('确认要删除笔记本吗', '删除笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
            return Notebooks.deleteNotebook(notebook.id)
        }).then(res => {
             this.notebooks.splice(this.notebooks.indexOf(notebook),1)
             this.$message.success(res.msg)
        })

             
        }
    }
}
</script>
<style lang="css" scoped>
 @import url(../assets/css/notebook-list.css);
</style>
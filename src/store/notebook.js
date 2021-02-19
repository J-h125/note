import Notebook from '@/apis/notebooks'
import {Message} from 'element-ui'

const state = {
    notebooks:null,
    curBookId:null
}
const getters ={
    notebooks: state => state.notebooks || [],
    curBook: state => {
        if(!Array.isArray(state.notebooks)){return {}}
        if(!state.curBookId){return state.notebooks[0]}
        return state.notebooks.find(notebook => notebook.id == state.curBookId) || {} //notebook.id 是数字  curBookID是字符串 ==
    }
}
const mutations = {
    setNotebooks(state,payload){
        state.notebooks = payload.notebooks
    },
    addNotebook(state,payload){
        state.notebooks.unshift(payload.notebook)
    },
    updateNotebook(state,payload){
        let notebook = state.notebooks.find(notebook => notebook.id == payload.notebookId)||{}
        notebook.title = payload.title
    },
    deleteNotebook(state,payload){
        state.notebooks = state.notebooks.filter(notebook => notebook.id != payload.notebookId)
    },
    setCurBook(state,payload){
        state.curBookId = payload.curBookId
    }
}
const actions = {
    getNotebooks({commit}){   //得到笔记本 数组
       return Notebook.getAll()             //return 的还是一个Promise对象
        .then(res => {
            commit('setNotebooks',{ notebooks:res.data })
        })
    },
    addNotebook({commit},payload){              //增加一个笔记本
        return Notebook.addNotebook({title:payload.title})
        .then(res => {
            commit('addNotebook',{notebook:res.data})
            Message.success(res.msg)
        })
    },
    updateNotebook({commit},payload){
        return Notebook.updateNotebook(payload.notebookId,{title:payload.title})
        .then(res => {
            commit('updateNotebook',{notebookId:payload.notebookId,title:payload.title})
        })
    },
    deleteNotebook({commit},payload){
        return Notebook.deleteNotebook(payload.notebookId)
        .then(res => {
            commit('deleteNotebook',{ notebookId:payload.notebookId})
        })
    }
}
export default {
    state,
    getters,
    mutations,
    actions,
}

import Trash from '@/apis/trash.js'
import {Message} from 'element-ui'

const state = {
    trashNotes:null,
    curTrashNoteId:null
}
const getters = {
    trashNotes: state => state.trashNotes || [],
    curTrashNote:(state,getters) => {
        if(!state.curTrashNoteId){return getters.trashNotes[0] || {}}
        return state.trashNotes.find(note => note.id ==state.curTrashNoteId) || {}
    },
    belongTo:(state,getters,rootState,rootGetters) => {           //所属笔记本
        console.log(rootState,rootGetters)
        let notebook = rootGetters.notebooks.find(notebook => notebook.id == getters.curTrashNote.notebookId) || {}
        return notebook.title || notebook.id || ''
    }
}
const mutations = {
    setTrashNotes(state,payload){
        state.trashNotes = payload.trashNotes
    },
    addTrashNote(state,payload){
        state.TrashNotes.unshift(payload.note)        //something  
    },
    deleteTrashNote(state,payload){
        state.trashNotes = state.trashNotes.filter(note => note.id != payload.noteId)
    },
    setCurTrashNote(state,payload={}){               //payload 不能为空 默认为{}  TrashDetail 92
        state.curTrashNoteId = payload.curTrashNoteId
    }
}
const actions = {
    getTrashNotes({commit}){
        return Trash.getAll()
            .then(res => {
                commit('setTrashNotes',{trashNotes:res.data})
            })
    },
    deleteTrashNote({commit},{noteId}) {
        return Trash.deleteNote(noteId)
            .then(res => {
                commit('deleteTrashNote',{noteId})
                Message.success(res.msg)
            })
    },
    revertTrashNote({commit},{noteId}){
        return Trash.revertNote(noteId)
            .then(res => {
                commit('deleteTrashNote',{noteId})
                Message.success(res.msg)
            })
    }

}
export default {
    state,
    getters,
    mutations,
    actions,
}
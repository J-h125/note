import request from "@/helpers/request"
import {noteDate} from "@/helpers/notedate"


const URL = {
    GET:'/notes/trash',                 //获取trash
    REVERT:'/notes/:noteId/revert',     //恢复
    DELETE:'/notes/:noteId/confirm'     //彻底删除
}
export default {
    getAll(){
        return new Promise((resolve,reject)=>{
            request(URL.GET)
            .then(res =>{
                res.data = res.data.sort((note1,note2) => note1.createAt < note2.createAt)   //排序
                res.data.forEach(note => {
                    note.createdAtFriendly = noteDate(note.createdAt)
                    note.updatedAtFriendly = noteDate(note.updatedAt)
                })
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    deleteNote(noteId){
        return request(URL.DELETE.replace(':noteId',noteId),'DELETE')
    },
    revertNote(noteId){
        return request(URL.REVERT.replace(':noteId',noteId),'PATCH')
    },
}
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import NotebookList from "../components/NotebookList"
import NoteDetail from "../components/NoteDetail"
import TrashDetail from "../components/TrashDetail"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias:'/notebooks',        //別名
    component: () => import('../components/NotebookList.vue')
  },
  {
    path: '/login',
    component:  () => import('../components/Login.vue')
  },
  {
    path: '/note',
    component:  () => import('../components/NoteDetail.vue')
  },
  {
    path: '/trash',
    component:  () => import('../components/TrashDetail.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router

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
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/notebooks',
    component: NotebookList
  },
  {
    path: '/note',
    component: NoteDetail
  },
  {
    path: '/trash',
    component: TrashDetail
  },
]

const router = new VueRouter({
  routes
})

export default router

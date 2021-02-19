import Vue from 'vue'
import Vuex from 'vuex'
import notebook from './notebook'
import note from './note'
import trash from './trash'
import user from './user'


Vue.use(Vuex)

const store =  new Vuex.Store({
  modules: {
    notebook,
    note,
    trash,
    user
  }
})
// store.commit(type:'increment',amount:5)
 //console.log(store.state.count)


export default store
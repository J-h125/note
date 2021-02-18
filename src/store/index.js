import Vue from 'vue'
import Vuex from 'vuex'
import notebook from './notebook'

Vue.use(Vuex)

const store =  new Vuex.Store({
  modules: {
    notebook
  }
})
// store.commit(type:'increment',amount:5)
 //console.log(store.state.count)


export default store
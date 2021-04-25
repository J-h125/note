<template>
  <div id="sidebar">
      <avatar/>
    <div class="icons">
      <router-link to="/note" title="笔记">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-note"></use>
        </svg>
        <div class="text">详情</div>
       </router-link>
      <router-link to="/notebooks" title="笔记本">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-notebook"></use>
        </svg>
        <div class="text">列表</div>
        </router-link>
      <router-link to="/trash" title="回收站">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-trash"></use>
        </svg>
        <div class="text">回收站</div>
        </router-link>
    </div> 
    <div class="logout" >
      <svg class="icon" aria-hidden="true"  @click="onLogout">
        <use xlink:href="#icon-exit"></use>
      </svg>
      <div class="text">退出</div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
import Auth from '@/apis/auth'
import {mapActions} from 'vuex'
    
  export default {
      components:{
            Avatar  
      },
      methods:{
        ...mapActions(['logout']),
        onLogout(){
          this.logout({path:'/login'})
        }
          // logout(){
          //     Auth.logout()
          //     .then(data=>{
          //         this.$router.push({path:'/login'})
          //         console.log(data)
          //     })
          // }
      }
  }  

</script>

<style scoped>

#sidebar {

  position: relative;
  width: 100px;
  text-align: center;
  background-color: #f5f5f5;
}

.icons {
  margin-top: 15px;
}

.icons a {
  padding: 6px 0;
  display: block;
}

.icons .router-link-active {
  background-color: #eee;
}

.logout {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}


</style>
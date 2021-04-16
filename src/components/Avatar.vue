<template>
    <span :title="username">{{slug}}</span>
</template>

<script>
    import Auth from '@/apis/auth'   
    import Bus from "@/helpers/bus.js"
    import {mapGetters,mapActions} from 'vuex'

export default {
    data(){
        return{
            // username:'note',
           
        }
    },
    created(){
        // Bus.$on('userInfo',user => {
        //     this.username = user.username
        // })
        // Auth.getInfo()
        // .then(res=>{
        //     if(res.isLogin){
        //         this.username = res.data.username
        //     }
        // })
        this.checkLogin()
    },
    methods:{
        ...mapActions(['checkLogin'])
    },
    computed:{
        ...mapGetters([
            'username',
            'slug'
        ]),
        // slug(){
        //     return this.username.charAt(0)
        // }
    }

}
</script>

<style scoped>

span {
    display: inline-block;
    width:30px;
    height: 30px;
    text-align: center;
    line-height: 32px;
    border-radius:50%;
   background: #398dee;
   color: #fff;
   text-shadow: 1px 0 1px #795c19;
   font-weight: bold;
   text-transform: uppercase;
   font-size: 18px;
   margin-top: 15px;
}
</style>

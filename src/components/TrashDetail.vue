<template>
    <div id="trash-detail">
        <h1>{{msg}}:{{$route.params.noteId}}</h1>
    </div>
</template>

<script>
export default {
    data(){
        return{
            msg:'回收站笔记本'
        }
    }
}
</script>
<style scoped>
    h1{
        color:yellow
    }
</style>
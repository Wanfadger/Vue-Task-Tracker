<template>
<header>
<h1>{{title}}</h1>
<Button :text="showAddTask ? 'Close' : 'Add Task'" :color="showAddTask ? 'red' : 'green'" @btn-click="$emit('toggle-add-task')" />
</header>
</template>


<script>
import Button from './Button'



export default {        
    name:"Header",
    components:{
        Button
    },
    props:{
        title:{
            default:"Hello World",
            type:String
        },
        showAddTask:Boolean
    },
    emits:['toggle-add-task']

}
</script>

<style scoped>
 header{
     display: flex;
     justify-content: space-between;
     margin-bottom: 20px;
     align-items: center;

 }
</style>
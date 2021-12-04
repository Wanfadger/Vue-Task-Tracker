<template>
    <div v-for="task in tasks" :key="task.id">
        <Task :task="task" @toggle-reminder="$emit('toggle-reminder' , task)"  @delete-task="$emit('delete-task' , task)"  />
    </div>
</template>


<script>
import Task from './Task.vue'

export default {
name:"Tasks",
components:{
    Task
},
props:{
    tasks:{
        default:[]
    }
} ,
emits:['delete-task' , 'toggle-reminder'] 
}
</script>


<style scoped>

</style>
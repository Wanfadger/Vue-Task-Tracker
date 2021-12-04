<template>
    <div :class="[task.reminder ?  'reminder':'' ,   'task']">
        <h3>{{task.text}} 
            <span class="fas fa-times" @click="deleteTask(task)" ></span>
            </h3> 
        <p>{{task.day}}</p>
    </div>
</template>


<script>
export default {
    name:"Task",
    props:{
        task:Object
    },methods: {
        deleteTask(task){
            this.$emit("delete-task" , task)
        }
    },
}
</script>

<style scoped>
.fas {
  color: red;
}
.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.task.reminder {
  border-left: 5px solid green;
}
.task h3 {
  display: flex;
justify-content: space-between;
  align-items: center;
 
}
</style>
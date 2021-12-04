<template>
    <div :class="[task.reminder ?  'reminder':'' ,   'task']" @dblclick="$emit('toggle-reminder' , task)">
        <h3>{{task.text}} 
            <span class="fas fa-times"   @click="$emit('delete-task' , task)" ></span>
            </h3> 
        <p>{{task.day}}</p>
    </div>
</template>


<script>
export default {
    name:"Task",
    props:{
        task:Object
    }
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
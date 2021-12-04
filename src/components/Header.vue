<template>
<header>
<h1>{{title}}</h1>
<Button text="Add Task" color="green" />
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
        }
    }

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
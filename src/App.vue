<template>
  <div class="container">
    <Header
      :showAddTask="showAddTask"
      title="Task Tracker"
      @toggle-add-task="toggleAddTask"
    />
    <div v-show="showAddTask">
      <AddTask @add-task="addTask" />
    </div>
    <Tasks
      :tasks="tasks"
      @delete-task="deleteTask"
      @toggle-reminder="toggleReminder"
    />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Tasks from "./components/Tasks.vue";
import AddTask from "./components/AddTask.vue";

export default {
  name: "App",
  components: {
    Header,
    Tasks,
    AddTask,
  },
  data() {
    return {
      tasks: [],
      showAddTask: false,
    };
  },
  async created() {
    this.tasks = await this.fetchTasks();
    // [
    //   {id:1 ,
    //   text:"Doctors Appointment",
    //   day:"March 1st at 2:30pm",
    //   reminder:true
    //   },
    //         {id:2 ,
    //   text:"Meeting at School",
    //   day:"March 3rd at 1:30pm",
    //   reminder:true
    //   },
    //         {id:3 ,
    //   text:"Food Shopping",
    //   day:"March 3rd at 11:00am",
    //   reminder:false
    //   },
    //         {id:4 ,
    //   text:"Learn VueJs",
    //   day:"December 3rd at 2:30pm",
    //   reminder:true
    //   },
    //         {id:5 ,
    //   text:"Install Fhir Server",
    //   day:"November 21st at 2:30pm",
    //   reminder:true
    //   },
    //         {id:6 ,
    //   text:"Configure Hapi Fhir Server",
    //   day:"December 1st at 2:30pm",
    //   reminder:false
    //   },
    // ]
  },

  methods: {
    async fetchTasks() {
      const response = await fetch("http://localhost:5000/tasks");
      return response.json();
    },
    async fetchTask(id) {
      const response = await fetch(`http://localhost:5000/tasks/${id}`);
      return response.json();
    },

    async deleteTask(task) {
      if (confirm("Are You Sure")) {
        await fetch(`http://localhost:5000/tasks/${task.id}`, {
          method: "DELETE",
        });

        this.tasks = await this.fetchTasks();
      }
    },
    async toggleReminder(task) {
      if (confirm("Are You Sure to toggle reminder")) {
        const getResponse = await this.fetchTask(task.id);
        const updateTask = { ...getResponse, reminder: !getResponse.reminder };
        await fetch(`http://localhost:5000/tasks/${updateTask.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateTask),
        });
        this.tasks = await this.fetchTasks();
      }
    },
    async addTask(task) {
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      this.tasks = [...this.tasks, data];
    },
    toggleAddTask() {
      this.showAddTask = !this.showAddTask;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Poppins", sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>

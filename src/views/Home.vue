<template>
  <div v-show="showAddTask">
    <AddTask @add-task="addTask" />
  </div>
  <Tasks
    :tasks="tasks"
    @delete-task="deleteTask"
    @toggle-reminder="toggleReminder"
  />
</template>


<script>
import Tasks from "../components/Tasks.vue";
import AddTask from "../components/AddTask.vue";

export default {
  name: "Home",
  props:{
    showAddTask:Boolean
  },
  components: { Tasks, AddTask },
  data() {
    return {
      tasks: [],
    };
  },
  async created() {
    this.tasks = await this.fetchTasks();
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
  },
};
</script>
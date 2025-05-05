<script setup>
import { ref, defineAsyncComponent, onMounted} from 'vue'
import { storeToRefs } from 'pinia'
import { useTasksStore } from '@/stores/tasks'

const Dialog = defineAsyncComponent(() => import('../UI/Dialog.vue'))
import KanbanContainer from '../UI/KanbanContainer.vue'
import Loader from '../UI/Loader.vue'

// Use tasks store
const tasksStore = useTasksStore()
const { todoTasks, inProgressTasks, doneTasks, board, loading } = storeToRefs(tasksStore)

onMounted(() => {
  tasksStore.fetchTasks()
})

const showDialog = ref(false)
const updatedBoard = ref(null)

// Handle task movement
const handleTaskMoved = (event) => {
  const movedTaskItem = tasksStore.moveTask(event)

  if (movedTaskItem) {
    updatedBoard.value = board.value.find(col => col.title === event.newGroup)?.tasks

    showDialog.value = true
  }
}


</script>
<template>
  <Loader v-if="loading" />
  <div class="kaban-wrapper" v-if="!loading">
    <KanbanContainer 
      title="To do" 
      :tasks="todoTasks" 
      group="to-do"
      @task-moved="handleTaskMoved"
      :column-index="0"
    />
    <KanbanContainer 
      title="In progress" 
      :tasks="inProgressTasks" 
      group="in-progress"
      @task-moved="handleTaskMoved"
      :column-index="1"
    />
    <KanbanContainer 
      title="Done" 
      :tasks="doneTasks" 
      group="done"
      @task-moved="handleTaskMoved"
      :column-index="2"
    />
    <Dialog 
      v-if="showDialog" 
      :display="showDialog" 
      :data="updatedBoard" 
      @close="showDialog = false" 
    />
  </div>
</template>
<style scoped>
.kaban-wrapper{
    display: flex;
    flex-direction: row;
    gap: 36px
}

@media screen and (orientation: portrait) {
  .kaban-wrapper{
    flex-direction: column;
    flex-wrap: wrap;
  }
}
</style>

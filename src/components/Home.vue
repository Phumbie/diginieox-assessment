<script setup>
import { ref, defineAsyncComponent, onMounted} from 'vue'
import { storeToRefs } from 'pinia'
import { useTasksStore } from '@/stores/tasks'
import { BOARD_TYPES } from '../boardTypes'

const Dialog = defineAsyncComponent(() => import('../UI/Dialog.vue'))
import KanbanContainer from '../UI/KanbanContainer.vue'
import Loader from '../UI/Loader.vue'

// Use tasks store
const tasksStore = useTasksStore()
const { todoTasks, inProgressTasks, doneTasks, board, loading } = storeToRefs(tasksStore)

const columns = [
  { title: 'To do', group: BOARD_TYPES.TODO, columnIndex: 0 },
  { title: 'In progress', group: BOARD_TYPES.IN_PROGRESS, columnIndex: 1 },
  { title: 'Done', group: BOARD_TYPES.DONE, columnIndex: 2 },
]

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
      v-for="col in columns"
      :key="col.group"
      :title="col.title"
      :group="col.group"
      @task-moved="handleTaskMoved"
      :column-index="col.columnIndex"
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

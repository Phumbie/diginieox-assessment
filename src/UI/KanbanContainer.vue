<script setup>
import { ref, defineProps, defineEmits, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useTasksStore } from '@/stores/tasks'
import draggable from 'vuedraggable'
import KanbanCard from './KabanCard.vue'

// Use tasks store
const tasksStore = useTasksStore()
const { todoTasks, inProgressTasks, doneTasks } = storeToRefs(tasksStore)

const props = defineProps({
    title: {
        type: String,
        default: "To Do"
    },
    group: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['task-moved'])

// Determine which task list to use based on the title
const taskList = computed({
    get: () => {
        switch(props.group) {
            case 'to-do': return todoTasks.value || []
            case 'in-progress': return inProgressTasks.value || []
            case 'done': return doneTasks.value || []
            default: return []
        }
    },
    set: (newValue) => {
        switch(props.group) {
            case 'to-do': 
                todoTasks.value = newValue
                break
            case 'in-progress': 
                inProgressTasks.value = newValue
                break
            case 'done': 
                doneTasks.value = newValue
                break
        }
    }
})

const onEnd = (event) => {
    console.log('Full event object:', event)
    console.log('Old Index:', event.oldIndex)
    console.log('New Index:', event.newIndex)
    console.log('Old Group:', event.from.dataset.group)
    console.log('New Group:', event.to.dataset.group)

    // Only emit if the task has actually moved
    if ( event.from.dataset.group !== event.to.dataset.group) {
        emit('task-moved', {
            oldIndex: event.oldIndex,
            newIndex: event.newIndex,
            oldGroup: event.from.dataset.group,
            newGroup: event.to.dataset.group
        })
    } 
}

const onAdd = (event) => {
    console.log('Add event:', event.item)
    // Additional logic for adding tasks if needed
}

const draggingItem = ref(null)

const onStart = (event) => {
    console.log('Start event:', event)
    const item = taskList.value[event.oldIndex]
    
    // Mark the item as dragging
    item.isDragging = true
    draggingItem.value = item
    
    // Move the item to the top of the list within its own column
    taskList.value.splice(event.oldIndex, 1)
    taskList.value.unshift(item)
    
    // Ensure the dragging card appears at the top
    event.from.insertBefore(event.item, event.from.firstChild)
}

// Tasks are now managed directly through the computed property
</script>

<template>
    <div class="kanban-container">
        <h2 class="kanban_header heading-2">{{ title }}</h2>
        <draggable 
            v-model="taskList"
            :group="'tasks'" 
            class="kanban_body" 
            :data-group="group"
            :item-key="title"
            :sort="false"
            :direction="'horizontal'"
            :animation="150"
            @end="onEnd"
        >
            <template #item="{ element }">
                <KanbanCard 
                    :content="element.title" 
                    :backgroundColor="element.color || '#F1FAEE'"
                />
            </template>
        </draggable>
    </div>
</template>

<style scoped>
.kanban-container{
    border: 4px solid var(--color-pastel-black);
    border-radius: 4px;
    padding: 16px;
    width: 100%;
    height: calc(100dvh - 180px);
    overflow: scroll;
}

.kanban_body{
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.kanban_header{
        margin-bottom: 16px;
        color: var(--color-pastel-black);
        line-height: 48px
}

.error-card {
    background-color: #ffdddd;
    color: #ff0000;
    padding: 16px;
    border-radius: 4px;
    margin-bottom: 16px;
    text-align: center;
}

@media screen and (orientation: portrait) {
  .kanban-container{
    height: 100%
  }

  .kanban_body{
    flex-direction: row;
    gap: 24px;
}
}
</style>

    
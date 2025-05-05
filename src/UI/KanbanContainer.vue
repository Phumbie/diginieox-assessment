<script setup>
import { ref, defineProps, defineEmits, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useTasksStore } from '@/stores/tasks'
import { BOARD_TYPES } from '../boardTypes'
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
            case BOARD_TYPES.TODO: return todoTasks.value || []
            case BOARD_TYPES.IN_PROGRESS: return inProgressTasks.value || []
            case BOARD_TYPES.DONE: return doneTasks.value || []
            default: return []
        }
    },
    set: (newValue) => {
        switch(props.group) {
            case BOARD_TYPES.TODO: 
                todoTasks.value = newValue
                break
            case BOARD_TYPES.IN_PROGRESS: 
                inProgressTasks.value = newValue
                break
            case BOARD_TYPES.DONE: 
                doneTasks.value = newValue
                break
        }
    }
})

const onEnd = (event) => {
    if ( event.from.dataset.group !== event.to.dataset.group) {
        emit('task-moved', {
            oldIndex: event.oldIndex,
            newIndex: event.newIndex,
            oldGroup: event.from.dataset.group,
            newGroup: event.to.dataset.group
        })
    } 
}

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
            <template #item="{ element , index}">
                <transition-group name="kanban-fade" tag="div" :key="`${index}-${element.title}`">
                  <KanbanCard 
                      :key="`${index}-${element.title}`"
                      :content="element.title" 
                      :backgroundColor="element.color || '#F1FAEE'"
                  />
                </transition-group>
            </template>
        </draggable>
    </div>
</template>

<style scoped>
.kanban-container{
    border: 0.25rem solid var(--color-pastel-black);
    border-radius: 0.5rem;
    padding: 1rem;
    width: 100%;
    height: calc(100dvh - 11.25rem);
    overflow-y: auto;
    background: var(--color-pastel-white, #fff);
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    transition: box-shadow 0.2s;
}
.kanban-container:focus-within {
    box-shadow: 0 0 0 3px var(--color-pastel-blue, #457b9d);
    outline: none;
}

.kanban_body{
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.kanban_header{
    margin-bottom: 1rem;
    color: var(--color-pastel-black);
    line-height: 3rem;
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.01em;
}

.error-card {
    background-color: #ffdddd;
    color: #ff0000;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    text-align: center;
}

.kanban-fade-enter-active, .kanban-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
}
.kanban-fade-enter-from, .kanban-fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.96);
}
.kanban-fade-enter-to, .kanban-fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

@media screen and (orientation: portrait) {
  .kanban-container{
    height: 100%;
    min-width: 0;
  }
  .kanban_body{
    flex-direction: row;
    gap: 1.5rem;
  }
}

/* Accessibility: focus for draggable area */
.kanban_body:focus {
  outline: 2px solid var(--color-pastel-blue, #457b9d);
  outline-offset: 2px;
}

</style>

    
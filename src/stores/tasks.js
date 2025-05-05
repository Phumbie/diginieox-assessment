import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
  // Initial tasks data
  const initialTasks = [
    {
      id: 1,
      title: "Stay hungry, stay foolish.",
      color: "#A8DADC",
      status: "to-do"
    },
    {
      id: 2,
      title: "Simplicity is the ultimate sophistication.",
      color: "#F1FAEE",
      status: "in-progress"
    },
    {
      id: 3,
      title: "The only way out is through.",
      color: "#FFDDD2",
      status: "to-do"
    },
    {
      id: 4,
      title: "What we think, we become.",
      color: "#CDB4DB",
      status: "done"
    },
    {
      id: 5,
      title: "Dream big. Dare bigger.",
      color: "#F1FAEE",
      status: "in-progress"
    },
    {
      id: 6,
      title: "Everything you can imagine is real.",
      color: "#A8DADC",
      status: "to-do"
    },
    {
      id: 7,
      title: "Do one thing every day that scares you.",
      color: "#FFDDD2",
      status: "done"
    },
    {
      id: 8,
      title: "Act as if what you do makes a difference. It does.",
      color: "#CDB4DB",
      status: "in-progress"
    },
    {
      id: 9,
      title: "Be yourself; everyone else is already taken.",
      color: "#F1FAEE",
      status: "to-do"
    },
    {
      id: 10,
      title: "Turn your wounds into wisdom.",
      color: "#A8DADC",
      status: "in-progress"
    }
  ]

  // Board structure
  const board = ref([
    {
      title: 'to-do',
      tasks: initialTasks.filter(task => task.status === 'to-do')
    },
    {
      title: 'in-progress',
      tasks: initialTasks.filter(task => task.status === 'in-progress')
    },
    {
      title: 'done',
      tasks: initialTasks.filter(task => task.status === 'done')
    }
  ])

  // Computed properties for tasks
  const todoTasks = ref(board.value.find(col => col.title === 'to-do')?.tasks || [])
  const inProgressTasks = ref(board.value.find(col => col.title === 'in-progress')?.tasks || [])
  const doneTasks = ref(board.value.find(col => col.title === 'done')?.tasks || [])

  // Function to move task between columns
  function moveTask(event) {
    const { oldIndex, newIndex, oldGroup, newGroup } = event

    // Find source and destination columns
    const sourceColumn = board.value.find(col => col.title === oldGroup)
    const destColumn = board.value.find(col => col.title === newGroup)

    if (!sourceColumn || !destColumn) {
      console.error('Invalid column')
      return null
    }

    // Remove task from source column
    const [movedTask] = sourceColumn.tasks.splice(oldIndex, 1)

    // Update task status
    movedTask.status = newGroup

    // Add task to destination column
    destColumn.tasks.unshift(movedTask)

    // Update local task arrays
    updateLocalTaskArrays()

    return movedTask
  }

  // Update local task arrays
  function updateLocalTaskArrays() {
    todoTasks.value = board.value.find(col => col.title === 'to-do')?.tasks || []
    inProgressTasks.value = board.value.find(col => col.title === 'in-progress')?.tasks || []
    doneTasks.value = board.value.find(col => col.title === 'done')?.tasks || []
  }




  return {
    board,
    todoTasks,
    inProgressTasks,
    doneTasks,
    moveTask,
  }
})

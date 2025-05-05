import { defineStore } from 'pinia'
import { ref} from 'vue'
import { BOARD_TYPES } from '../boardTypes'

export const useTasksStore = defineStore('tasks', () => {
  // Initial tasks data
  const initialTasks = ref([]);

  // Loading state
  const loading = ref(false);

  // Board structure
  const board = ref([]);

  // Fetch tasks from endpoint
  async function fetchTasks() {
    loading.value = true;
    let endpoint = "https://q1z3telex7a9metry.denaliops.com/data.json";
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      initialTasks.value = data;
      // Update board and local tasks
      board.value = [
        { title: BOARD_TYPES.TODO, tasks: initialTasks.value.filter((task) => task.status === BOARD_TYPES.TODO) },
        { title: BOARD_TYPES.IN_PROGRESS, tasks: initialTasks.value.filter((task) => task.status === BOARD_TYPES.IN_PROGRESS) },
        { title: BOARD_TYPES.DONE, tasks: initialTasks.value.filter((task) => task.status === BOARD_TYPES.DONE) },
      ];
      updateLocalTaskArrays();
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  // Computed properties for tasks
  const todoTasks = ref(board.value.find((col) => col.title === BOARD_TYPES.TODO)?.tasks || []);
  const inProgressTasks = ref(board.value.find((col) => col.title === BOARD_TYPES.IN_PROGRESS)?.tasks || []);
  const doneTasks = ref(board.value.find((col) => col.title === BOARD_TYPES.DONE)?.tasks || []);

  // Function to move task between columns
  function moveTask(event) {
    const { oldIndex, newIndex, oldGroup, newGroup } = event;

    // Find source and destination columns
    const sourceColumn = board.value.find((col) => col.title === oldGroup);
    const destColumn = board.value.find((col) => col.title === newGroup); // No change needed here, event uses values

    if (!sourceColumn || !destColumn) {
      console.error("Invalid column");
      return null;
    }

    // Remove task from source column
    const [movedTask] = sourceColumn.tasks.splice(oldIndex, 1);

    // Update task status
    movedTask.status = newGroup;

    // Add task to destination column
    destColumn.tasks.unshift(movedTask);

    // Update local task arrays
    updateLocalTaskArrays();

    return movedTask;
  }

  // Update local task arrays
  function updateLocalTaskArrays() {
    todoTasks.value = board.value.find((col) => col.title === BOARD_TYPES.TODO)?.tasks || [];
    inProgressTasks.value = board.value.find((col) => col.title === BOARD_TYPES.IN_PROGRESS)?.tasks || [];
    doneTasks.value = board.value.find((col) => col.title === BOARD_TYPES.DONE)?.tasks || [];
  }

  return {
    board,
    todoTasks,
    inProgressTasks,
    doneTasks,
    moveTask,
    fetchTasks,
    loading,
  };
})

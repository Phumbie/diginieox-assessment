<script setup>
import { ref , defineAsyncComponent} from 'vue'
const Dialog =  defineAsyncComponent(()=> import('../UI/Dialog.vue'))
import KanbanContainer from '../UI/KanbanContainer.vue'

const showDialog = ref(true)
</script>
<template>
  <div class="kaban-wrapper">
    <KanbanContainer />
    <KanbanContainer />
    <KanbanContainer />
    <!-- <Dialog :display="showDialog" /> -->
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

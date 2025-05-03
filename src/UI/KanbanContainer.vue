<script setup>
import { ref, defineProps } from 'vue'
const props = defineProps({
    title: {
        type: String,
        default: "To Do"
    }
})
</script>

<template>
    <div class="kanban-container">
        <h2 class="kanban_header heading-2">{{ title }}</h2>
        <div class="kanban_body">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.kanban-container{
    border: 4px solid var(--color-pastel-black);
    border-radius: 4px;
    padding: 16px;
    width: 100%;
    height: calc(100dvh - 180px)
}

@media screen and (orientation: portrait) {
  .kanban-container{
    height: 100%
  }
}
</style>

    
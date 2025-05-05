<script setup>
import { ref, defineProps } from 'vue'
const props = defineProps({
    content: {
        type: String,
        default: "Stay hungry, stay foolish."
    },
    backgroundColor: {
        type: String,
        default: "#F1FAEE"
    }
})
</script>

<template>
    <div :style="{ backgroundColor : backgroundColor }" class="kanban-card">
        <p class="kanban-card__content">{{ content }}</p>
    </div>
</template>

<style scoped>
.kanban-card{
    border-radius: 0.25rem;
    padding: 1.5rem;
    background-color: var(--color-pastel-white);
    width: 100%;
    cursor:grab;
    transition: all 0.5s ease
}

.kanban-card:hover{
   box-shadow: var(--shadow-element);     
}

.kanban-card__content {
    /* Add any specific styles for the content element if needed */
}

@media screen and (orientation: portrait) {
    .kanban-card{
        width: 9.25rem;
        display: grid;
        place-items: center;
        height: 10rem;
        overflow: scroll;
        padding: 0.75rem
    }
}
</style>
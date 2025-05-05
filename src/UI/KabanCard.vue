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
        <p class="kanban_card_content">{{ content }}</p>
    </div>
</template>

<style scoped>
.kanban-card{
    border-radius: 4px;
    padding: 24px;
    background-color: var(--color-pastel-white);
    width: 100%;
    cursor:grab;
    transition: all 0.5s ease
}

.kanban-card:hover{
   box-shadow: var(--shadow-element);     
}

@media screen and (orientation: portrait) {
    .kanban-card{
        max-width: 148px;
        display: grid;
        place-items: center;
        height: 160px;
        overflow: scroll
    }
}
</style>
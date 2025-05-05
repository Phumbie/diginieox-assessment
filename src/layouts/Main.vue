<script setup>
import Sidebar from "./Sidebar.vue";
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const currentHeading = computed(() => {
  return route.name || 'Tasks';
});
</script>
<template>
    <div class="main-container">
        <Sidebar />
        <div class="main-content">
            <h1 class="heading-1 main-heading">{{ currentHeading }}</h1>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.main-container{
    display: flex;
    width: 100%;
    height: 100dvh;
    
}

.main-content{
    width: 100%;
    height: 100vh;
    padding: 3rem;
    overflow-y: scroll;
}
.main-heading{
    margin-bottom: 3rem;
}
</style>

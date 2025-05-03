<script setup>
import Sidebar from "./Sidebar.vue";
</script>
<template>
    <div class="main-container">
        <Sidebar />
        <slot></slot>
    </div>
</template>

<style scoped>
.main-container{
    display: flex;
    width: 100%;
    height: 100vh;
}
</style>

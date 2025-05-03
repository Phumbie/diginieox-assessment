<script setup>
import Sidebar from "./Sidebar.vue";
</script>
<template>
    <div class="main-container">
        <Sidebar />
        <div class="main-content">
            <h1 class="heading-1 main-heading">Tasks</h1>
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
    padding: 48px;
    overflow-y: scroll;
}
.main-heading{
    margin-bottom: 48px;
}
</style>

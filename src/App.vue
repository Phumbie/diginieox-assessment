<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MainLayout from './layouts/Main.vue'
</script>

<template>
  <MainLayout>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </MainLayout>
</template>


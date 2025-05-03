<script setup>
import { ref , defineAsyncComponent} from 'vue'
const Dialog =  defineAsyncComponent(()=> import('../UI/Dialog.vue'))

const showDialog = ref(true)
</script>
<template>
  <p>hello</p>
  
  <Dialog :display="showDialog" />
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  display: {
    type: Boolean,
    default: false
  },
  data: {
    type: Array,
    default: () => ([{
    "title": "Simplicity is the ultimate sophistication.",
    "color": "#F1FAEE",
    "status": "in-progress"
  }])
  }
})

const emit = defineEmits(['close'])

const closeDialog = () => {
  emit('close')
}
</script>

<template>
    <div class="dialog-container" v-if="props.display">
        <div class="dialog-content shadow-element">
                <div class="dialog_header">
                    <h2 class="heading-2">CARD UPDATED</h2>
                </div>
                <div class="dialog_body">
                    <pre>{{ JSON.stringify(props.data, null, 2) }}</pre>
                </div>
                <div class="dialog_footer">
                    <button @click="closeDialog">Close</button>
                </div>
        </div>
    </div>
</template>

<style scoped>
.dialog-container{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.dialog-content{
    background-color: var(--color-pastel-white);
    border-radius: 0.5rem;
    box-shadow: var(--shadow-element);
    width: 580px;
    overflow: hidden;
    
}

.dialog_header{
    padding: 1rem;
    background: var(--color-pastel-lapis);
    color: var(--color-pastel-white);
}

.dialog_body{
    padding: 1rem;
    max-height: 15rem;
    overflow: scroll
}

.dialog_body pre{
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0.2px;
}
.dialog_footer{
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-top: 1px solid var(--color-pastel-lapis)
}
button{
  font-weight: 500; 
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0.32px; 
  text-transform: uppercase;
  text-align: center;
  padding: 0; 
  display: inline-block;
  overflow: hidden;
  vertical-align: baseline;
  border: none;
  outline: none;
  color: var(--color-pastel-lapis);
  background: none;
  cursor: pointer;
  text-align: right
}
</style>
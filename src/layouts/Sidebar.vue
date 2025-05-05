<script setup>
import {ref, computed } from 'vue'


const isSidebarExpanded = ref(false)

const toggleMode = () => {
  isSidebarExpanded.value = !isSidebarExpanded.value
}

// Import icons
import menuDark from '../assets/icons/menu-dark.svg'
import menuWhite from '../assets/icons/menu-white.svg'
import tasksDark from '../assets/icons/tasks-dark.svg'
import tasksWhite from '../assets/icons/tasks-white.svg'
import notificationDark from '../assets/icons/notification-dark.svg'
import notificationWhite from '../assets/icons/notification-white.svg'
import settingsDark from '../assets/icons/settings-dark.svg'
import settingsWhite from '../assets/icons/settings-white.svg'

</script>
<template>
    <aside class="sidebar-container">
        <ul>
            <li>
                <div class="nav-item hamburger" @click="toggleMode">
                    <img :src="menuWhite" alt="menu" class="nav-icon">
                </div>
            </li>
            <li>
                <router-link to="/" v-slot="{isActive}">
                        <div class="nav-item" :class="{ 'nav-labels__active': isActive }">
                        <img :src="isActive ? tasksDark : tasksWhite" alt="tasks" class="nav-icon">
                        <p class="nav-labels" v-show="isSidebarExpanded">Tasks</p>
                        </div>
                </router-link>
            </li>
              <li>
                <router-link to="/notifications" v-slot="{isActive}">
                        <div class="nav-item" :class="{ 'nav-labels__active': isActive }">
                        <img :src="isActive ? notificationDark : notificationWhite" alt="tasks" class="nav-icon">
                        <p class="nav-labels" v-show="isSidebarExpanded">Notifications</p>
                        </div>
                </router-link>
            </li>
               <li>
                <router-link to="/settings" v-slot="{isActive}">
                        <div class="nav-item" :class="{ 'nav-labels__active': isActive }">
                        <img :src="isActive ? settingsDark : settingsWhite" alt="tasks" class="nav-icon">
                        <p class="nav-labels" v-show="isSidebarExpanded">Settings</p>
                        </div>
                </router-link>
            </li>
        </ul>
    </aside>
</template>

<style scoped>
.sidebar-container{
    height: 100%;
    background-color: var(--color-pastel-lapis);
    transition: width 0.5s ease-in-out;
}

.nav-item{
    display: flex;
    align-items: center;
    gap: 16px;
    height: 64px;
    margin-top: 48px;
    padding: 0 10px;
}

.nav-item.hamburger{
    cursor: pointer;
}

.nav-labels{
  font-family: 'Roboto', sans-serif;
  font-weight: 300; 
  font-size: 20px;
  line-height: 1.4;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  margin-bottom: 0;
  color: var(--color-pastel-white);
}
.nav-icon{
    width: 48px;
    height: 48px;
}

.nav-labels__active{
    color: var(--color-pastel-lapis);
    background-color: var(--color-pastel-white);
}
.nav-labels__active p{
    color: var(--color-pastel-lapis);
}
ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

li {
    padding: 0;
    margin: 0;
}
</style>
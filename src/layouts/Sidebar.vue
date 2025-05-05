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

const sidebarLinks = [
  {
    path: '/',
    label: 'Tasks',
    iconActive: tasksDark,
    iconInactive: tasksWhite,
    alt: 'tasks',
  },
  {
    path: '/notifications',
    label: 'Notifications',
    iconActive: notificationDark,
    iconInactive: notificationWhite,
    alt: 'notifications',
  },
  {
    path: '/settings',
    label: 'Settings',
    iconActive: settingsDark,
    iconInactive: settingsWhite,
    alt: 'settings',
  },
];
</script>
<template>
    <aside class="sidebar-container" :class="{ expanded: isSidebarExpanded }">
        <ul>
            <li>
                <div class="nav-item hamburger" @click="toggleMode">
                    <img :src="menuWhite" alt="menu" class="nav-icon">
                </div>
            </li>
            <li v-for="link in sidebarLinks" :key="link.path">
                <router-link :to="link.path" v-slot="{ isActive }">
                        <div class="nav-item" :class="{ 'nav-labels__active': isActive }">
                        <img :src="isActive ? link.iconActive : link.iconInactive" :alt="link.alt" class="nav-icon">
                        <p class="nav-labels" v-show="isSidebarExpanded">{{ link.label }}</p>
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
    transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
    width: 4.6rem;
    overflow-x: hidden;
}
.sidebar-container.expanded {
    width: 18.75rem;
}

.nav-item{
    display: flex;
    align-items: center;
    gap: 1rem;
    height: 4rem;
    margin-top: 3rem;
    padding: 0 0.625rem;
    transition: background 0.2s, color 0.2s;
}
.nav-item:focus {
    outline: 2px solid var(--color-pastel-white);
    outline-offset: 2px;
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
    width: 3rem;
    height: 3rem;
    flex-shrink: 0;
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
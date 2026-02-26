<template>
  <div class="flex h-screen overflow-hidden">
    <Sidebar
      :is-collapsed="isSidebarCollapsed"
      @close="isSidebarCollapsed = true"
    />
    <div class="flex flex-1 flex-col overflow-hidden">
      <Header
        :is-sidebar-open="!isSidebarCollapsed"
        @toggle-sidebar="isSidebarCollapsed = !isSidebarCollapsed"
      />
      <main
        class="flex-1 overflow-y-auto p-4 lg:p-6"
        role="main"
      >
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Sidebar from '~/components/layout/Sidebar.vue'
import Header from '~/components/layout/Header.vue'

const isSidebarCollapsed = ref(false)

onMounted(() => {
  // On mobile, sidebar starts collapsed
  if (window.innerWidth < 1024) {
    isSidebarCollapsed.value = true
  }
})
</script>

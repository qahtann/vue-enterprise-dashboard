<template>
  <header
    class="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6"
    role="banner"
  >
    <button
      class="lg:hidden"
      :aria-label="isSidebarOpen ? 'Close sidebar' : 'Open sidebar'"
      @click="$emit('toggle-sidebar')"
    >
      <Menu class="h-6 w-6" />
    </button>

    <div class="flex flex-1 items-center justify-end gap-4">
      <button
        :aria-label="`Switch to ${colorMode.preference === 'dark' ? 'light' : 'dark'} mode`"
        @click="toggleTheme"
      >
        <Sun
          v-if="colorMode.value === 'dark'"
          class="h-5 w-5"
        />
        <Moon
          v-else
          class="h-5 w-5"
        />
      </button>

      <button
        class="relative"
        aria-label="Notifications"
        @click="showNotifications = !showNotifications"
      >
        <Bell class="h-5 w-5" />
        <span
          v-if="notificationCount > 0"
          class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground"
          :aria-label="`${notificationCount} unread notifications`"
        >
          {{ notificationCount > 9 ? '9+' : notificationCount }}
        </span>
      </button>

      <DropdownMenu>
        <template #trigger>
          <button
            class="flex items-center space-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-ring"
            :aria-label="`User menu for ${userStore.currentUser?.name}`"
          >
            <img
              v-if="userStore.currentUser?.avatar"
              :src="userStore.currentUser.avatar"
              :alt="`${userStore.currentUser.name} avatar`"
              class="h-8 w-8 rounded-full"
            />
            <div
              v-else
              class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              {{ userStore.currentUser?.name?.charAt(0) || 'U' }}
            </div>
            <ChevronDown class="h-4 w-4" />
          </button>
        </template>
        <DropdownMenuItem @click="navigateTo('/settings')">
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem @click="handleLogout">
          Logout
        </DropdownMenuItem>
      </DropdownMenu>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu, Bell, Sun, Moon, ChevronDown } from 'lucide-vue-next'
import { useUserStore } from '~/stores/user'
import DropdownMenu from '~/components/ui/DropdownMenu.vue'
import DropdownMenuItem from '~/components/ui/DropdownMenuItem.vue'

interface Props {
  isSidebarOpen?: boolean
}

withDefaults(defineProps<Props>(), {
  isSidebarOpen: false,
})

const colorMode = useColorMode()
const userStore = useUserStore()
const showNotifications = ref(false)
const notificationCount = ref(3)

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

const handleLogout = () => {
  // Mock logout - in real app, clear tokens, etc.
  console.log('Logout clicked')
}
</script>

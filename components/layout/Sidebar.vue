<template>
  <aside
    :class="cn(
      'fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card transition-transform',
      isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'translate-x-0',
      'lg:static lg:translate-x-0'
    )"
    :aria-label="isCollapsed ? 'Collapsed sidebar' : 'Main navigation'"
  >
    <div class="flex h-full flex-col">
      <div class="flex h-16 items-center border-b px-4">
        <NuxtLink
          to="/"
          class="flex items-center space-x-2"
          :aria-label="isCollapsed ? 'Dashboard home' : 'Vue Enterprise Dashboard'"
        >
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LayoutDashboard class="h-5 w-5" />
          </div>
          <span
            v-if="!isCollapsed"
            class="text-lg font-semibold"
          >
            Dashboard
          </span>
        </NuxtLink>
      </div>
      <nav class="flex-1 space-y-1 p-4" role="navigation" aria-label="Main navigation">
        <NuxtLink
          v-for="item in visibleNavItems"
          :key="item.path"
          :to="item.path"
          :class="cn(
            'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            isActive(item.path)
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )"
          :aria-current="isActive(item.path) ? 'page' : undefined"
        >
          <component :is="item.icon" class="h-5 w-5 flex-shrink-0" :aria-hidden="true" />
          <span v-if="!isCollapsed">{{ item.label }}</span>
        </NuxtLink>
      </nav>
    </div>
  </aside>
  <div
    v-if="!isCollapsed"
    class="fixed inset-0 z-30 bg-black/50 lg:hidden"
    @click="$emit('close')"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
} from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { useRoleCheck } from '~/composables/useRoleCheck'
import { cn } from '~/lib/utils'

interface NavItem {
  path: string
  label: string
  icon: any
  roles?: string[]
}

interface Props {
  isCollapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isCollapsed: false,
})

defineEmits<{
  close: []
}>()

const route = useRoute()
const { canAccess } = useRoleCheck()

const navItems: NavItem[] = [
  {
    path: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    path: '/users',
    label: 'Users',
    icon: Users,
    roles: ['admin'],
  },
  {
    path: '/analytics',
    label: 'Analytics',
    icon: BarChart3,
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: Settings,
  },
]

const visibleNavItems = computed(() => {
  return navItems.filter(item => {
    if (!item.roles) return true
    return item.roles.some(role => canAccess(role as any))
  })
})

const isActive = (path: string): boolean => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>

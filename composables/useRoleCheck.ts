import { computed } from 'vue'
import { useUserStore } from '~/stores/user'
import type { UserRole } from '~/lib/types'

export function useRoleCheck() {
  const userStore = useUserStore()

  const isAdmin = computed(() => userStore.isAdmin)
  const isUser = computed(() => userStore.isUser)
  const currentUser = computed(() => userStore.currentUser)

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!currentUser.value) return false
    const roles = Array.isArray(role) ? role : [role]
    return roles.includes(currentUser.value.role)
  }

  const canAccess = (requiredRole: UserRole | UserRole[]): boolean => {
    return hasRole(requiredRole)
  }

  return {
    isAdmin,
    isUser,
    currentUser,
    hasRole,
    canAccess,
  }
}

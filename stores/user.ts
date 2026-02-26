import { defineStore } from 'pinia'
import type { User, UserRole } from '~/lib/types'

interface UserState {
  currentUser: User | null
  users: User[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    currentUser: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      createdAt: new Date().toISOString(),
    },
    users: [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'admin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'user',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
        createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        role: 'user',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
        createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      },
      {
        id: '4',
        name: 'Alice Williams',
        email: 'alice.williams@example.com',
        role: 'user',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
      {
        id: '5',
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        role: 'guest',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
        createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      },
    ],
  }),

  getters: {
    isAdmin: (state): boolean => {
      return state.currentUser?.role === 'admin'
    },
    isUser: (state): boolean => {
      return state.currentUser?.role === 'user' || state.currentUser?.role === 'admin'
    },
    getUserById: (state) => {
      return (id: string) => state.users.find(user => user.id === id)
    },
  },

  actions: {
    setCurrentUser(user: User | null) {
      this.currentUser = user
    },
    updateUserRole(id: string, role: UserRole) {
      const user = this.users.find(u => u.id === id)
      if (user) {
        user.role = role
      }
      if (this.currentUser?.id === id) {
        this.currentUser.role = role
      }
    },
    addUser(user: Omit<User, 'id' | 'createdAt'>) {
      const newUser: User = {
        ...user,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      this.users.push(newUser)
      return newUser
    },
    updateUser(id: string, updates: Partial<User>) {
      const user = this.users.find(u => u.id === id)
      if (user) {
        Object.assign(user, updates)
      }
      if (this.currentUser?.id === id) {
        Object.assign(this.currentUser, updates)
      }
    },
    deleteUser(id: string) {
      const index = this.users.findIndex(u => u.id === id)
      if (index > -1) {
        this.users.splice(index, 1)
      }
    },
  },
})

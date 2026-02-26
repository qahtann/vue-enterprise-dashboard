import { defineStore } from 'pinia'

type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeState {
  mode: ThemeMode
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    mode: 'system',
  }),

  actions: {
    setMode(mode: ThemeMode) {
      this.mode = mode
    },
  },
})

<template>
  <div class="relative inline-block text-left" v-click-outside="close">
    <button
      ref="triggerRef"
      type="button"
      :class="cn('inline-flex items-center justify-center rounded-md', triggerClass)"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
      @click="toggle"
    >
      <slot name="trigger" />
    </button>
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        ref="menuRef"
        :class="cn(
          'absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-popover shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
          menuClass
        )"
        role="menu"
        aria-orientation="vertical"
      >
        <div class="py-1" role="none">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { cn } from '~/lib/utils'

interface Props {
  triggerClass?: string
  menuClass?: string
}

withDefaults(defineProps<Props>(), {
  triggerClass: '',
  menuClass: '',
})

const isOpen = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isOpen.value) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

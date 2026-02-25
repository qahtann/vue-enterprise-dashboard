<template>
  <button
    :class="cn(
      'block w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground',
      $attrs.class
    )"
    role="menuitem"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { cn } from '~/lib/utils'

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

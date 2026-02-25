<template>
  <div :class="cn('w-full', $attrs.class)">
    <div class="border-b border-border" role="tablist">
      <div class="flex space-x-1">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          :class="cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-t-lg px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            activeTab === tab.value
              ? 'border-b-2 border-primary text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )"
          :aria-selected="activeTab === tab.value"
          :aria-controls="`tabpanel-${tab.value}`"
          role="tab"
          @click="selectTab(tab.value)"
        >
          <slot name="tab" :tab="tab">
            {{ tab.label }}
          </slot>
        </button>
      </div>
    </div>
    <div
      v-for="tab in tabs"
      :key="tab.value"
      :id="`tabpanel-${tab.value}`"
      :class="cn('mt-2', activeTab !== tab.value && 'hidden')"
      role="tabpanel"
    >
      <slot :name="tab.value" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '~/lib/utils'

interface Tab {
  value: string
  label: string
}

interface Props {
  tabs: Tab[]
  defaultTab?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultTab: undefined,
})

const activeTab = ref(props.defaultTab || props.tabs[0]?.value || '')

const selectTab = (value: string) => {
  activeTab.value = value
}

defineExpose({
  activeTab,
  selectTab,
})
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle class="text-sm font-medium">
        {{ kpi.title }}
      </CardTitle>
      <component
        :is="iconComponent"
        :class="cn('h-4 w-4 text-muted-foreground', iconClass)"
        :aria-hidden="true"
      />
    </CardHeader>
    <CardContent>
      <div class="text-2xl font-bold">{{ kpi.value }}</div>
      <p class="text-xs text-muted-foreground mt-1">
        <span :class="changeColorClass">
          {{ kpi.change > 0 ? '+' : '' }}{{ kpi.change }}%
        </span>
        from last month
      </p>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as LucideIcons from 'lucide-vue-next'
import type { KpiCard as KpiCardType } from '~/lib/types'
import { cn } from '~/lib/utils'
import Card from '~/components/ui/Card.vue'
import CardHeader from '~/components/ui/CardHeader.vue'
import CardTitle from '~/components/ui/CardTitle.vue'
import CardContent from '~/components/ui/CardContent.vue'

interface Props {
  kpi: KpiCardType
}

const props = defineProps<Props>()

const iconComponent = computed(() => {
  const IconName = props.kpi.icon as keyof typeof LucideIcons
  return LucideIcons[IconName] || LucideIcons.TrendingUp
})

const iconClass = computed(() => {
  return props.kpi.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
})

const changeColorClass = computed(() => {
  return props.kpi.changeType === 'increase'
    ? 'text-green-600 dark:text-green-400'
    : 'text-red-600 dark:text-red-400'
})
</script>

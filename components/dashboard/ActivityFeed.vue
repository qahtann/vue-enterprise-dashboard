<template>
  <Card>
    <CardHeader>
      <CardTitle>Recent Activity</CardTitle>
      <CardDescription>Latest updates and events</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        <div
          v-for="activity in activities"
          :key="activity.id"
          class="flex items-start space-x-4"
        >
          <div
            :class="cn(
              'flex h-8 w-8 items-center justify-center rounded-full',
              activityTypeClasses[activity.type]
            )"
          >
            <component
              :is="activityIcons[activity.type]"
              class="h-4 w-4"
              :aria-hidden="true"
            />
          </div>
          <div class="flex-1 space-y-1">
            <p class="text-sm font-medium leading-none">{{ activity.title }}</p>
            <p class="text-sm text-muted-foreground">{{ activity.description }}</p>
            <p class="text-xs text-muted-foreground">{{ formatDate(activity.timestamp) }}</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { User, Bell, AlertCircle } from 'lucide-vue-next'
import type { Activity } from '~/lib/types'
import { formatDate } from '~/lib/utils'
import { cn } from '~/lib/utils'
import Card from '~/components/ui/Card.vue'
import CardHeader from '~/components/ui/CardHeader.vue'
import CardTitle from '~/components/ui/CardTitle.vue'
import CardDescription from '~/components/ui/CardDescription.vue'
import CardContent from '~/components/ui/CardContent.vue'

interface Props {
  activities: Activity[]
}

defineProps<Props>()

const activityIcons = {
  user: User,
  system: Bell,
  alert: AlertCircle,
}

const activityTypeClasses = {
  user: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300',
  system: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
  alert: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300',
}
</script>

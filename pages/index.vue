<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p class="text-muted-foreground">
        Welcome back, {{ userStore.currentUser?.name }}!
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        v-for="kpi in dataStore.kpis"
        :key="kpi.id"
        :kpi="kpi"
      />
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card class="col-span-4">
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Monthly revenue trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartWrapper
            title=""
            :chart-data="dataStore.analyticsData"
            type="line"
          />
        </CardContent>
      </Card>
      <Card class="col-span-3">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and events</CardDescription>
        </CardHeader>
        <CardContent>
          <ActivityFeed :activities="recentActivities" />
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '~/stores/user'
import { useDataStore } from '~/stores/data'
import KpiCard from '~/components/dashboard/KpiCard.vue'
import ChartWrapper from '~/components/dashboard/ChartWrapper.vue'
import ActivityFeed from '~/components/dashboard/ActivityFeed.vue'
import Card from '~/components/ui/Card.vue'
import CardHeader from '~/components/ui/CardHeader.vue'
import CardTitle from '~/components/ui/CardTitle.vue'
import CardDescription from '~/components/ui/CardDescription.vue'
import CardContent from '~/components/ui/CardContent.vue'

definePageMeta({
  layout: 'default',
})

const userStore = useUserStore()
const dataStore = useDataStore()

const recentActivities = computed(() => {
  return dataStore.activities.slice(0, 5)
})
</script>

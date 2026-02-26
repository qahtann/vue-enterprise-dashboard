<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Analytics</h1>
      <p class="text-muted-foreground">
        Comprehensive analytics and insights
      </p>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap items-center gap-4">
          <div>
            <Label for="dateRange">Date Range</Label>
            <select
              id="dateRange"
              v-model="selectedFilter.dateRange"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              @change="updateAnalytics"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          <div class="flex items-end">
            <Button @click="exportData">
              Export Data
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <div class="grid gap-4 md:grid-cols-2">
      <ChartWrapper
        title="Revenue Trends"
        description="Revenue over time"
        :chart-data="dataStore.analyticsData"
        type="line"
      />
      <ChartWrapper
        title="Weekly Sales"
        description="Sales by day of week"
        :chart-data="dataStore.salesData"
        type="bar"
      />
    </div>

    <ChartWrapper
      title="User Growth"
      description="Quarterly user growth"
      :chart-data="dataStore.userGrowthData"
      type="doughnut"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDataStore } from '~/stores/data'
import type { AnalyticsFilter } from '~/lib/types'
import ChartWrapper from '~/components/dashboard/ChartWrapper.vue'
import Card from '~/components/ui/Card.vue'
import CardHeader from '~/components/ui/CardHeader.vue'
import CardTitle from '~/components/ui/CardTitle.vue'
import CardContent from '~/components/ui/CardContent.vue'
import Button from '~/components/ui/Button.vue'
import Label from '~/components/ui/Label.vue'

definePageMeta({
  layout: 'default',
})

const dataStore = useDataStore()
const selectedFilter = ref<AnalyticsFilter>({
  dateRange: '30d',
})

const updateAnalytics = () => {
  dataStore.updateAnalyticsData(selectedFilter.value)
}

const exportData = () => {
  // Mock export functionality
  const data = JSON.stringify(dataStore.analyticsData, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `analytics-${selectedFilter.value.dateRange}.json`
  a.click()
  URL.revokeObjectURL(url)
}

onMounted(() => {
  updateAnalytics()
})
</script>

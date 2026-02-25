<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
      <CardDescription v-if="description">{{ description }}</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="h-[300px] w-full">
        <Line
          v-if="type === 'line'"
          :data="chartData"
          :options="chartOptions"
        />
        <Bar
          v-else-if="type === 'bar'"
          :data="chartData"
          :options="chartOptions"
        />
        <Doughnut
          v-else-if="type === 'doughnut'"
          :data="chartData"
          :options="chartOptions"
        />
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Line, Bar, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import type { ChartData } from '~/lib/types'
import Card from '~/components/ui/Card.vue'
import CardHeader from '~/components/ui/CardHeader.vue'
import CardTitle from '~/components/ui/CardTitle.vue'
import CardDescription from '~/components/ui/CardDescription.vue'
import CardContent from '~/components/ui/CardContent.vue'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

interface Props {
  title: string
  description?: string
  chartData: ChartData
  type?: 'line' | 'bar' | 'doughnut'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'line',
})

const colorMode = useColorMode()

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: colorMode.value === 'dark' ? '#e5e7eb' : '#374151',
      },
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: props.type !== 'doughnut' ? {
    x: {
      ticks: {
        color: colorMode.value === 'dark' ? '#e5e7eb' : '#374151',
      },
      grid: {
        color: colorMode.value === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      },
    },
    y: {
      ticks: {
        color: colorMode.value === 'dark' ? '#e5e7eb' : '#374151',
      },
      grid: {
        color: colorMode.value === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      },
    },
  } : undefined,
}))
</script>

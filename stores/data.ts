import { defineStore } from 'pinia'
import type { KpiCard, Activity, ChartData, AnalyticsFilter } from '~/lib/types'

interface DataState {
  kpis: KpiCard[]
  activities: Activity[]
  analyticsData: ChartData
  salesData: ChartData
  userGrowthData: ChartData
}

export const useDataStore = defineStore('data', {
  state: (): DataState => ({
    kpis: [
      {
        id: '1',
        title: 'Total Revenue',
        value: '$45,231',
        change: 20.1,
        changeType: 'increase',
        icon: 'DollarSign',
      },
      {
        id: '2',
        title: 'Active Users',
        value: '2,350',
        change: 12.5,
        changeType: 'increase',
        icon: 'Users',
      },
      {
        id: '3',
        title: 'Conversion Rate',
        value: '12.5%',
        change: -2.4,
        changeType: 'decrease',
        icon: 'TrendingUp',
      },
      {
        id: '4',
        title: 'Avg. Order Value',
        value: '$1,234',
        change: 8.2,
        changeType: 'increase',
        icon: 'ShoppingCart',
      },
    ],
    activities: [
      {
        id: '1',
        type: 'user',
        title: 'New user registered',
        description: 'Jane Smith created an account',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        user: 'Jane Smith',
      },
      {
        id: '2',
        type: 'system',
        title: 'System backup completed',
        description: 'Daily backup completed successfully',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: '3',
        type: 'alert',
        title: 'High traffic detected',
        description: 'Traffic increased by 150% in the last hour',
        timestamp: new Date(Date.now() - 10800000).toISOString(),
      },
      {
        id: '4',
        type: 'user',
        title: 'Profile updated',
        description: 'John Doe updated their profile information',
        timestamp: new Date(Date.now() - 14400000).toISOString(),
        user: 'John Doe',
      },
      {
        id: '5',
        type: 'system',
        title: 'Security scan completed',
        description: 'No threats detected',
        timestamp: new Date(Date.now() - 18000000).toISOString(),
      },
    ],
    analyticsData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Revenue',
          data: [12000, 19000, 15000, 25000, 22000, 30000],
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgba(59, 130, 246, 1)',
        },
      ],
    },
    salesData: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Sales',
          data: [450, 520, 480, 610, 550, 720, 680],
          backgroundColor: 'rgba(34, 197, 94, 0.5)',
          borderColor: 'rgba(34, 197, 94, 1)',
        },
      ],
    },
    userGrowthData: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'New Users',
          data: [1200, 1900, 1500, 2300],
          backgroundColor: [
            'rgba(168, 85, 247, 0.5)',
            'rgba(236, 72, 153, 0.5)',
            'rgba(251, 146, 60, 0.5)',
            'rgba(34, 197, 94, 0.5)',
          ],
          borderColor: [
            'rgba(168, 85, 247, 1)',
            'rgba(236, 72, 153, 1)',
            'rgba(251, 146, 60, 1)',
            'rgba(34, 197, 94, 1)',
          ],
        },
      ],
    },
  }),

  actions: {
    updateAnalyticsData(filter: AnalyticsFilter) {
      // Mock data generation based on filter
      const days = filter.dateRange === '7d' ? 7 : filter.dateRange === '30d' ? 30 : filter.dateRange === '90d' ? 90 : 365
      const labels: string[] = []
      const data: number[] = []
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
        data.push(Math.floor(Math.random() * 10000) + 5000)
      }
      
      this.analyticsData = {
        labels,
        datasets: [{
          label: 'Revenue',
          data,
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgba(59, 130, 246, 1)',
        }],
      }
    },
    addActivity(activity: Omit<Activity, 'id' | 'timestamp'>) {
      const newActivity: Activity = {
        ...activity,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      }
      this.activities.unshift(newActivity)
      if (this.activities.length > 50) {
        this.activities.pop()
      }
    },
  },
})

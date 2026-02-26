export type UserRole = 'admin' | 'user' | 'guest'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  createdAt: string
}

export interface KpiCard {
  id: string
  title: string
  value: string | number
  change: number
  changeType: 'increase' | 'decrease'
  icon: string
}

export interface Activity {
  id: string
  type: 'user' | 'system' | 'alert'
  title: string
  description: string
  timestamp: string
  user?: string
}

export interface TableColumn<T = any> {
  key: string
  label: string
  sortable?: boolean
  render?: (row: T) => string | number
}

export interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
  }>
}

export interface AnalyticsFilter {
  dateRange: '7d' | '30d' | '90d' | '1y'
  category?: string
}

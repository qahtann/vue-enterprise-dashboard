<template>
  <Card>
    <CardHeader>
      <div class="flex items-center justify-between">
        <div>
          <CardTitle>{{ title }}</CardTitle>
          <CardDescription v-if="description">{{ description }}</CardDescription>
        </div>
        <div v-if="searchable" class="flex items-center space-x-2">
          <Input
            v-model="searchQuery"
            placeholder="Search..."
            class="w-64"
            aria-label="Search table"
          />
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              v-for="column in columns"
              :key="column.key"
              :class="column.sortable ? 'cursor-pointer select-none' : ''"
              @click="column.sortable && handleSort(column.key)"
            >
              <div class="flex items-center space-x-2">
                <span>{{ column.label }}</span>
                <span
                  v-if="column.sortable && sortKey === column.key"
                  class="text-xs"
                >
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </div>
            </TableHead>
            <TableHead v-if="actions" class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="paginatedData.length === 0">
            <TableCell :colspan="columns.length + (actions ? 1 : 0)" class="text-center">
              No data available
            </TableCell>
          </TableRow>
          <TableRow
            v-for="row in paginatedData"
            :key="getRowId(row)"
          >
            <TableCell
              v-for="column in columns"
              :key="column.key"
            >
              {{ column.render ? column.render(row) : row[column.key] }}
            </TableCell>
            <TableCell v-if="actions" class="text-right">
              <slot name="actions" :row="row" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div
        v-if="paginated"
        class="flex items-center justify-between mt-4"
      >
        <div class="text-sm text-muted-foreground">
          Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredData.length }} results
        </div>
        <div class="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            Previous
          </Button>
          <span class="text-sm">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <Button
            variant="outline"
            size="sm"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            Next
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TableColumn } from '~/lib/types'
import Table from '~/components/ui/Table.vue'
import TableHeader from '~/components/ui/TableHeader.vue'
import TableBody from '~/components/ui/TableBody.vue'
import TableRow from '~/components/ui/TableRow.vue'
import TableHead from '~/components/ui/TableHead.vue'
import TableCell from '~/components/ui/TableCell.vue'
import Card from '~/components/ui/Card.vue'
import CardHeader from '~/components/ui/CardHeader.vue'
import CardTitle from '~/components/ui/CardTitle.vue'
import CardDescription from '~/components/ui/CardDescription.vue'
import CardContent from '~/components/ui/CardContent.vue'
import Input from '~/components/ui/Input.vue'
import Button from '~/components/ui/Button.vue'

interface Props<T = any> {
  title: string
  description?: string
  data: T[]
  columns: TableColumn<T>[]
  searchable?: boolean
  paginated?: boolean
  pageSize?: number
  actions?: boolean
  getRowId?: (row: T) => string | number
}

const props = withDefaults(defineProps<Props>(), {
  searchable: true,
  paginated: true,
  pageSize: 10,
  actions: false,
  getRowId: (row: any) => row.id || JSON.stringify(row),
})

const searchQuery = ref('')
const sortKey = ref<string | null>(null)
const sortDirection = ref<'asc' | 'desc'>('asc')
const currentPage = ref(1)

const filteredData = computed(() => {
  let result = [...props.data]

  if (props.searchable && searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(row => {
      return props.columns.some(column => {
        const value = column.render ? column.render(row) : row[column.key]
        return String(value).toLowerCase().includes(query)
      })
    })
  }

  if (sortKey.value) {
    result.sort((a, b) => {
      const aVal = a[sortKey.value!]
      const bVal = b[sortKey.value!]
      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      return sortDirection.value === 'asc' ? comparison : -comparison
    })
  }

  return result
})

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / props.pageSize)
})

const startIndex = computed(() => {
  return (currentPage.value - 1) * props.pageSize
})

const endIndex = computed(() => {
  return Math.min(startIndex.value + props.pageSize, filteredData.value.length)
})

const paginatedData = computed(() => {
  if (!props.paginated) {
    return filteredData.value
  }
  return filteredData.value.slice(startIndex.value, endIndex.value)
})

const handleSort = (key: string) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDirection.value = 'asc'
  }
  currentPage.value = 1
}
</script>

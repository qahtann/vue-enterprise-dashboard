<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Users</h1>
        <p class="text-muted-foreground">
          Manage user accounts and permissions
        </p>
      </div>
      <Button
        v-if="isAdmin"
        @click="showAddUserModal = true"
      >
        Add User
      </Button>
    </div>

    <DataTable
      title=""
      description=""
      :data="userStore.users"
      :columns="columns"
      :actions="isAdmin"
    >
      <template #actions="{ row }: { row: User }">
        <div class="flex items-center justify-end space-x-2">
          <Button
            variant="ghost"
            size="sm"
            @click="handleEdit(row)"
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            @click="handleDelete(row.id)"
          >
            Delete
          </Button>
        </div>
      </template>
    </DataTable>

    <!-- Add User Modal (simplified - in production, use proper modal component) -->
    <div
      v-if="showAddUserModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click="showAddUserModal = false"
    >
      <Card
        class="w-full max-w-md"
        @click.stop
      >
        <CardHeader>
          <CardTitle>Add New User</CardTitle>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleAddUser" class="space-y-4">
            <div>
              <Label for="name">Name</Label>
              <Input
                id="name"
                v-model="newUser.name"
                required
                aria-label="User name"
              />
            </div>
            <div>
              <Label for="email">Email</Label>
              <Input
                id="email"
                v-model="newUser.email"
                type="email"
                required
                aria-label="User email"
              />
            </div>
            <div>
              <Label for="role">Role</Label>
              <select
                id="role"
                v-model="newUser.role"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
                aria-label="User role"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="guest">Guest</option>
              </select>
            </div>
            <div class="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                @click="showAddUserModal = false"
              >
                Cancel
              </Button>
              <Button type="submit">
                Add User
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '~/stores/user'
import { useRoleCheck } from '~/composables/useRoleCheck'
import type { User, UserRole, TableColumn } from '~/lib/types'
import DataTable from '~/components/dashboard/DataTable.vue'
import Button from '~/components/ui/Button.vue'
import Card from '~/components/ui/Card.vue'
import CardHeader from '~/components/ui/CardHeader.vue'
import CardTitle from '~/components/ui/CardTitle.vue'
import CardContent from '~/components/ui/CardContent.vue'
import Input from '~/components/ui/Input.vue'
import Label from '~/components/ui/Label.vue'
import Badge from '~/components/ui/Badge.vue'

definePageMeta({
  layout: 'default',
  middleware: 'admin',
})

const userStore = useUserStore()
const { isAdmin } = useRoleCheck()

const showAddUserModal = ref(false)
const newUser = ref<Omit<User, 'id' | 'createdAt'>>({
  name: '',
  email: '',
  role: 'user',
})

const columns: TableColumn<User>[] = [
  {
    key: 'name',
    label: 'Name',
    sortable: true,
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true,
  },
  {
    key: 'role',
    label: 'Role',
    sortable: true,
    render: (row) => row.role.toUpperCase(),
  },
  {
    key: 'createdAt',
    label: 'Created',
    sortable: true,
    render: (row) => {
      return new Date(row.createdAt).toLocaleDateString()
    },
  },
]

const handleAddUser = () => {
  userStore.addUser(newUser.value)
  newUser.value = { name: '', email: '', role: 'user' }
  showAddUserModal.value = false
}

const handleEdit = (user: User) => {
  // In production, open edit modal
  console.log('Edit user:', user)
}

const handleDelete = (id: string) => {
  if (confirm('Are you sure you want to delete this user?')) {
    userStore.deleteUser(id)
  }
}

</script>

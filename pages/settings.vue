<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Settings</h1>
      <p class="text-muted-foreground">
        Manage your account settings and preferences
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleUpdateProfile" class="space-y-4">
            <div>
              <Label for="profile-name">Name</Label>
              <Input
                id="profile-name"
                v-model="profileForm.name"
                required
                aria-label="Your name"
              />
            </div>
            <div>
              <Label for="profile-email">Email</Label>
              <Input
                id="profile-email"
                v-model="profileForm.email"
                type="email"
                required
                aria-label="Your email"
              />
            </div>
            <Button type="submit">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose your preferred theme</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="flex items-center space-x-2">
              <input
                id="theme-light"
                v-model="selectedTheme"
                type="radio"
                value="light"
                class="h-4 w-4"
                @change="updateTheme"
              />
              <Label for="theme-light" class="cursor-pointer">Light</Label>
            </div>
            <div class="flex items-center space-x-2">
              <input
                id="theme-dark"
                v-model="selectedTheme"
                type="radio"
                value="dark"
                class="h-4 w-4"
                @change="updateTheme"
              />
              <Label for="theme-dark" class="cursor-pointer">Dark</Label>
            </div>
            <div class="flex items-center space-x-2">
              <input
                id="theme-system"
                v-model="selectedTheme"
                type="radio"
                value="system"
                class="h-4 w-4"
                @change="updateTheme"
              />
              <Label for="theme-system" class="cursor-pointer">System</Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '~/stores/user'
import Card from '~/components/ui/Card.vue'
import CardHeader from '~/components/ui/CardHeader.vue'
import CardTitle from '~/components/ui/CardTitle.vue'
import CardDescription from '~/components/ui/CardDescription.vue'
import CardContent from '~/components/ui/CardContent.vue'
import Button from '~/components/ui/Button.vue'
import Input from '~/components/ui/Input.vue'
import Label from '~/components/ui/Label.vue'

definePageMeta({
  layout: 'default',
})

const userStore = useUserStore()
const colorMode = useColorMode()

const profileForm = ref({
  name: '',
  email: '',
})

const selectedTheme = ref<'light' | 'dark' | 'system'>('system')

onMounted(() => {
  if (userStore.currentUser) {
    profileForm.value = {
      name: userStore.currentUser.name,
      email: userStore.currentUser.email,
    }
  }
  selectedTheme.value = colorMode.preference as 'light' | 'dark' | 'system'
})

const handleUpdateProfile = () => {
  if (userStore.currentUser) {
    userStore.updateUser(userStore.currentUser.id, {
      name: profileForm.value.name,
      email: profileForm.value.email,
    })
  }
}

const updateTheme = () => {
  colorMode.preference = selectedTheme.value
}
</script>

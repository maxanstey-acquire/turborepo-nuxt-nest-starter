<script setup lang="ts">
import { ORPCError } from '@orpc/client';
import type { User } from '@speechscribe/shared';

const client = useContractsClient();
const user = ref<User | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

const fetchUser = async () => {
  loading.value = true;
  error.value = null;

  try {
    const result = await client.auth.me();
    user.value = result.user;
    console.log('Authenticated user', result);
  } catch (err) {
    if (err instanceof ORPCError) {
      error.value = `${err.message} (status ${err.status})`;
    } else if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = 'Request failed';
    }
  } finally {
    loading.value = false;
  }
};

onMounted(fetchUser);
</script>

<template>
  <main class="min-h-screen bg-slate-50">
    <UContainer class="py-10">
      <div class="flex flex-col items-center">
        <UCard class="w-full max-w-2xl">
          <template #header>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-semibold text-primary">Starter kit</p>
                <p class="text-lg font-semibold text-gray-900">
                  oRPC + Nest + Nuxt
                </p>
              </div>
              <UBadge color="primary" variant="subtle">Nuxt UI</UBadge>
            </div>
          </template>

          <p class="text-gray-600 leading-relaxed">
            This page calls the Nest backend via the shared oRPC contract and
            logs the authenticated user to the console.
          </p>

          <div class="mt-4 flex flex-wrap gap-3 items-center">
            <UButton
              :loading="loading"
              :disabled="loading"
              icon="i-heroicons-arrow-path"
              @click="fetchUser"
            >
              {{ loading ? 'Loading…' : 'Fetch user' }}
            </UButton>

            <UAlert
              v-if="error"
              color="error"
              variant="soft"
              title="Request failed"
              :description="error"
              icon="i-heroicons-exclamation-triangle"
            />
          </div>

          <UCard v-if="user" class="mt-6">
            <template #header>
              <div class="flex items-center gap-2">
                <UAvatar
                  :alt="user.name"
                  :name="user.name"
                  :src="user.avatarUrl ?? undefined"
                  size="md"
                />
                <div class="flex flex-col leading-tight">
                  <span class="text-sm font-semibold">User from API</span>
                  <span class="text-xs text-gray-500"
                    >Data fetched with oRPC</span
                  >
                </div>
              </div>
            </template>

            <div class="space-y-1 text-sm text-gray-700">
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-user" class="text-gray-400" />
                <span class="font-medium">Name:</span>
                <span>{{ user.name }}</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-envelope" class="text-gray-400" />
                <span class="font-medium">Email:</span>
                <span>{{ user.email }}</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-heroicons-identification"
                  class="text-gray-400"
                />
                <span class="font-medium">ID:</span> <span>{{ user.id }}</span>
              </div>
            </div>
          </UCard>
        </UCard>
      </div>
    </UContainer>
  </main>
</template>

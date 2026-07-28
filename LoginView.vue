<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const username = ref<string>('')
const password = ref<string>('')
const rememberMe = ref<boolean>(false)

async function handleSubmit(): Promise<void> {
  const success = await auth.login({ username: username.value, password: password.value })
  if (success) {
    router.push('/')
  }
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-sm rounded-2xl overflow-hidden shadow-xl border border-teal-900/10">
      <div class="bg-teal-400 dark:bg-teal-700 py-6 text-center">
        <h1 class="font-display text-2xl font-semibold text-white">RISHI FASHION</h1>
      </div>

      <div class="bg-cream dark:bg-teal-900 p-6 space-y-4">
        <div>
          <h2 class="font-display text-xl font-semibold">Sign in</h2>
          <p class="text-sm text-teal-600 dark:text-teal-300">Sign in or create an account</p>
        </div>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <input v-model="username" type="text" placeholder="User name or Email" class="input-field" required />
          <input v-model="password" type="password" placeholder="Password" class="input-field" required />

          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center gap-2">
              <input v-model="rememberMe" type="checkbox" class="rounded border-teal-300" />
              Remember me
            </label>
            <a href="#" class="text-teal-600 dark:text-teal-300 hover:underline">Forgot my password</a>
          </div>

          <p v-if="auth.error" class="text-sm text-clay">{{ auth.error }}</p>

          <button type="submit" class="btn-primary w-full" :disabled="auth.loading">
            {{ auth.loading ? 'Signing in...' : 'Continue' }}
          </button>
        </form>

        <p class="text-xs text-teal-500 dark:text-teal-300 text-center">
          Demo credentials: <strong>emilys</strong> / <strong>emilyspass</strong> (from DummyJSON)
        </p>

        <div class="border-t border-teal-900/10 dark:border-cream/10 pt-4 text-center">
          <p class="text-sm mb-2">No account yet?</p>
          <button type="button" class="btn-outline w-full" disabled>Create an account</button>
        </div>
      </div>
    </div>
  </div>
</template>

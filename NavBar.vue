<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const auth = useAuthStore()
const cart = useCartStore()

const searchTerm = ref<string>('')
const isDark = ref<boolean>(document.documentElement.classList.contains('dark'))
const menuOpen = ref<boolean>(false)

function toggleDark(): void {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

function submitSearch(): void {
  if (!searchTerm.value.trim()) return
  router.push({ path: '/', query: { q: searchTerm.value.trim() } })
  menuOpen.value = false
}

function goToAccount(): void {
  if (auth.isLoggedIn) {
    router.push('/cart')
  } else {
    router.push('/login')
  }
}
</script>

<template>
  <header class="bg-teal-400 dark:bg-teal-800 sticky top-0 z-30 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
      <RouterLink to="/" class="font-display text-xl sm:text-2xl font-semibold text-white tracking-wide">
        RISHI FASHION
      </RouterLink>

      <button
        class="lg:hidden text-white"
        aria-label="Toggle menu"
        @click="menuOpen = !menuOpen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <nav class="hidden lg:flex items-center gap-6 text-white/95 font-medium">
        <RouterLink to="/" class="hover:text-white/70 transition">Home</RouterLink>
        <RouterLink to="/?category=womens-dresses" class="hover:text-white/70 transition">Shop</RouterLink>
        <RouterLink to="/?view=categories" class="hover:text-white/70 transition">Categories</RouterLink>
        <a href="#about" class="hover:text-white/70 transition">About</a>
        <a href="#contact" class="hover:text-white/70 transition">Contact</a>
      </nav>

      <div class="hidden lg:flex items-center gap-3">
        <form class="relative" @submit.prevent="submitSearch">
          <input
            v-model="searchTerm"
            type="search"
            placeholder="Search sarees..."
            class="rounded-full pl-4 pr-9 py-1.5 text-sm bg-white/90 focus:outline-none focus:ring-2 focus:ring-white w-44 xl:w-56"
          />
          <button type="submit" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-teal-700" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>

        <button
          class="text-white/90 hover:text-white transition"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleDark"
        >
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.36 6.36l-.7-.7M6.34 6.34l-.7-.7m12.02 0l-.7.7M6.34 17.66l-.7.7M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

        <RouterLink to="/cart" class="relative text-white/90 hover:text-white transition" aria-label="Cart">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span
            v-if="cart.itemCount > 0"
            class="absolute -top-2 -right-2 bg-clay text-white text-[10px] leading-none rounded-full h-4 w-4 flex items-center justify-center"
          >
            {{ cart.itemCount }}
          </span>
        </RouterLink>

        <button class="bg-white text-teal-700 rounded-full px-4 py-1.5 text-sm font-semibold hover:bg-white/90 transition" @click="goToAccount">
          {{ auth.isLoggedIn ? `Hi ${auth.user?.firstName}` : 'Login/Register' }}
        </button>
      </div>
    </div>

    <transition name="fade">
      <div v-if="menuOpen" class="lg:hidden bg-teal-400 dark:bg-teal-800 px-4 pb-4 space-y-3">
        <nav class="flex flex-col gap-2 text-white font-medium">
          <RouterLink to="/" @click="menuOpen = false">Home</RouterLink>
          <RouterLink to="/?category=womens-dresses" @click="menuOpen = false">Shop</RouterLink>
          <RouterLink to="/cart" @click="menuOpen = false">Cart ({{ cart.itemCount }})</RouterLink>
          <button class="text-left" @click="goToAccount(); menuOpen = false">
            {{ auth.isLoggedIn ? `Hi ${auth.user?.firstName}` : 'Login/Register' }}
          </button>
        </nav>
        <form class="relative" @submit.prevent="submitSearch">
          <input v-model="searchTerm" type="search" placeholder="Search sarees..." class="rounded-full pl-4 pr-9 py-1.5 text-sm bg-white/90 w-full" />
        </form>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

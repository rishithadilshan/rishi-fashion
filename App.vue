<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-1">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>

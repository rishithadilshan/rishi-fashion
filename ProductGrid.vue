<script setup lang="ts">
import type { Product } from '@/types/product'
import ProductCard from '@/components/ProductCard.vue'

defineProps<{
  products: Product[]
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'add-to-cart', product: Product): void
}>()
</script>

<template>
  <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    <div v-for="n in 8" :key="n" class="animate-pulse rounded-lg overflow-hidden border border-teal-900/10">
      <div class="aspect-[3/4] bg-teal-100 dark:bg-teal-800"></div>
      <div class="p-3 space-y-2">
        <div class="h-3 bg-teal-100 dark:bg-teal-800 rounded w-3/4"></div>
        <div class="h-3 bg-teal-100 dark:bg-teal-800 rounded w-1/2"></div>
      </div>
    </div>
  </div>

  <div v-else-if="products.length === 0" class="text-center py-16 text-teal-700 dark:text-teal-200">
    <p class="text-lg font-medium">No pieces match your search.</p>
    <p class="text-sm mt-1">Try a different category or search term.</p>
  </div>

  <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @add-to-cart="(p) => emit('add-to-cart', p)"
    />
  </div>
</template>

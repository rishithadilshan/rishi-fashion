<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '@/types/product'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  (e: 'add-to-cart', product: Product): void
}>()

const installment = computed<number>(() => Math.round(props.product.price / 2.51))
</script>

<template>
  <RouterLink
    :to="`/product/${product.id}`"
    class="group block border border-teal-900/10 dark:border-cream/10 rounded-lg overflow-hidden bg-white/60 dark:bg-teal-800/40 hover:shadow-lg transition-shadow"
  >
    <div class="aspect-[3/4] overflow-hidden bg-teal-50 dark:bg-teal-900">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div class="p-3 space-y-1">
      <h3 class="text-sm font-medium line-clamp-2 min-h-[2.5rem]">{{ product.title }}</h3>
      <p class="font-semibold text-teal-900 dark:text-cream">
        Rs {{ product.price.toLocaleString() }}.00
      </p>
      <p class="text-xs text-teal-600 dark:text-teal-300">
        3 X {{ installment.toLocaleString() }}.00 with KOKO
      </p>
      <button
        type="button"
        class="mt-2 w-full text-xs font-semibold border border-teal-900 dark:border-cream rounded-md py-1.5 hover:bg-teal-900 hover:text-white dark:hover:bg-cream dark:hover:text-teal-900 transition"
        @click.prevent="emit('add-to-cart', product)"
      >
        Add to Cart
      </button>
    </div>
  </RouterLink>
</template>

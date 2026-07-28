<script setup lang="ts">
import type { CategoryOption } from '@/types/product'

type SortOrder = 'default' | 'price-asc' | 'price-desc'

const props = defineProps<{
  categories: CategoryOption[]
  activeCategory: string
  sortOrder: SortOrder
}>()

const emit = defineEmits<{
  (e: 'update:activeCategory', value: string): void
  (e: 'update:sortOrder', value: SortOrder): void
}>()

function handleSortChange(event: Event): void {
  const value = (event.target as HTMLSelectElement).value as SortOrder
  emit('update:sortOrder', value)
}
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-6">
    <div class="flex flex-wrap gap-2">
      <button
        class="px-3 py-1.5 rounded-full text-xs font-medium border transition"
        :class="props.activeCategory === ''
          ? 'bg-teal-900 text-white border-teal-900 dark:bg-cream dark:text-teal-900'
          : 'border-teal-900/30 text-teal-800 hover:bg-teal-100 dark:text-cream dark:border-cream/30 dark:hover:bg-teal-700'"
        @click="emit('update:activeCategory', '')"
      >
        All
      </button>
      <button
        v-for="cat in props.categories"
        :key="cat.slug"
        class="px-3 py-1.5 rounded-full text-xs font-medium border capitalize transition"
        :class="props.activeCategory === cat.slug
          ? 'bg-teal-900 text-white border-teal-900 dark:bg-cream dark:text-teal-900'
          : 'border-teal-900/30 text-teal-800 hover:bg-teal-100 dark:text-cream dark:border-cream/30 dark:hover:bg-teal-700'"
        @click="emit('update:activeCategory', cat.slug)"
      >
        {{ cat.name }}
      </button>
    </div>

    <div class="sm:ml-auto flex items-center gap-2 text-sm">
      <label for="sort" class="text-teal-700 dark:text-teal-200">Sort:</label>
      <select
        id="sort"
        class="input-field w-auto py-1.5"
        :value="props.sortOrder"
        @change="handleSortChange"
      >
        <option value="default">Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ProductService } from '@/services/api'
import { useCartStore } from '@/stores/cart'
import type { Product, CategoryOption } from '@/types/product'
import FilterBar from '@/components/FilterBar.vue'
import ProductGrid from '@/components/ProductGrid.vue'
import batikHero from '@/assets/115images.jpg'

const route = useRoute()
const cart = useCartStore()

const products = ref<Product[]>([])
const categories = ref<CategoryOption[]>([])
const loading = ref<boolean>(true)
const activeCategory = ref<string>('')
const searchQuery = ref<string>('')
const sortOrder = ref<'default' | 'price-asc' | 'price-desc'>('default')

const CURATED_CATEGORIES = ['womens-dresses', 'womens-bags', 'womens-jewellery', 'womens-shoes']

async function loadCategories(): Promise<void> {
  categories.value = CURATED_CATEGORIES.map((slug) => ({
    slug,
    name: slug.replace('womens-', '').replace('-', ' '),
    url: '',
  }))
}

async function loadProducts(): Promise<void> {
  loading.value = true
  try {
    if (searchQuery.value) {
      const res = await ProductService.search(searchQuery.value)
      products.value = res.products
    } else if (activeCategory.value) {
      const res = await ProductService.getByCategory(activeCategory.value, 40)
      products.value = res.products
    } else {
      const res = await ProductService.getAll(8)
      products.value = res.products
    }
  } catch (err) {
    console.error('Failed to load products', err)
    products.value = []
  } finally {
    loading.value = false
  }
}

const sortedProducts = computed<Product[]>(() => {
  const list = [...products.value]
  if (sortOrder.value === 'price-asc') list.sort((a, b) => a.price - b.price)
  if (sortOrder.value === 'price-desc') list.sort((a, b) => b.price - a.price)
  return list
})

function handleAddToCart(product: Product): void {
  cart.addToCart(product, 1)
}

onMounted(() => {
  const q = route.query.q
  const cat = route.query.category
  if (typeof q === 'string') searchQuery.value = q
  if (typeof cat === 'string') activeCategory.value = cat
  loadCategories()
  loadProducts()
})

watch(
  () => route.query,
  (query) => {
    searchQuery.value = typeof query.q === 'string' ? query.q : ''
    activeCategory.value = typeof query.category === 'string' ? query.category : ''
    loadProducts()
  },
)

watch(activeCategory, () => {
  searchQuery.value = ''
  loadProducts()
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative bg-teal-100 dark:bg-teal-900 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 grid sm:grid-cols-2 gap-8 items-center">
        <div>
          <p class="uppercase tracking-widest text-xs text-teal-700 dark:text-teal-300 mb-2">New Season</p>
          <h1 class="font-display text-4xl sm:text-5xl font-bold text-teal-900 dark:text-cream leading-tight">
            Batik <span class="italic text-clay">Collection</span>
          </h1>
          <p class="mt-4 text-teal-700 dark:text-teal-200 max-w-md">
            Handcrafted cotton sarees, hand-dyed with the traditional wax-resist technique.
          </p>
          <a href="#new-arrivals" class="btn-primary inline-block mt-6">Shop the Collection</a>
        </div>
        <img
          :src="batikHero"
          alt="Model wearing a batik-inspired outfit"
          class="rounded-xl w-full h-64 sm:h-80 object-cover shadow-lg"
        />
      </div>
      <div class="bg-clay/90 text-white text-center py-2 text-sm font-medium">
        Shop Now. Pay Later! Select KOKO at checkout & split your bill into 3 interest-free installments.
      </div>
    </section>

    <section id="new-arrivals" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 class="font-display text-2xl font-semibold text-center mb-1">
        {{ searchQuery ? `Results for "${searchQuery}"` : activeCategory ? 'Collection' : 'New Arrivals' }}
      </h2>
      <p class="text-center text-sm text-teal-600 dark:text-teal-300 mb-6">
        Data live from DummyJSON — {{ sortedProducts.length }} pieces
      </p>

      <FilterBar
        v-model:active-category="activeCategory"
        v-model:sort-order="sortOrder"
        :categories="categories"
      />

      <ProductGrid :products="sortedProducts" :loading="loading" @add-to-cart="handleAddToCart" />
    </section>
  </div>
</template>

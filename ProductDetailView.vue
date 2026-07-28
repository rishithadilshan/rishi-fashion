<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ProductService } from '@/services/api'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/types/product'
import ProductCard from '@/components/ProductCard.vue'

const props = defineProps<{ id: string }>()
const route = useRoute()
const router = useRouter()
const cart = useCartStore()

const product = ref<Product | null>(null)
const related = ref<Product[]>([])
const activeImage = ref<string>('')
type TabKey = 'description' | 'additional' | 'reviews' | 'shipping'
const activeTab = ref<TabKey>('description')
const tabs: TabKey[] = ['description', 'additional', 'reviews', 'shipping']
const loading = ref<boolean>(true)

const productId = computed<number>(() => Number(props.id))

async function loadProduct(): Promise<void> {
  loading.value = true
  try {
    const data = await ProductService.getById(productId.value)
    product.value = data
    activeImage.value = data.images[0] ?? data.thumbnail
    const relatedRes = await ProductService.getByCategory(data.category, 4)
    related.value = relatedRes.products.filter((p) => p.id !== data.id).slice(0, 3)
  } catch (err) {
    console.error('Failed to load product', err)
    product.value = null
  } finally {
    loading.value = false
  }
}

function addToCart(): void {
  if (!product.value) return
  cart.addToCart(product.value, 1)
}

function buyNow(): void {
  addToCart()
  router.push('/checkout')
}

onMounted(loadProduct)
watch(() => route.params.id, loadProduct)
</script>

<template>
  <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center text-teal-600">
    Loading product...
  </div>

  <div v-else-if="!product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
    <p class="text-lg font-medium">Product not found.</p>
    <RouterLink to="/" class="btn-outline inline-block mt-4">Back to Shop</RouterLink>
  </div>

  <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <p class="text-xs text-teal-500 dark:text-teal-300 mb-4">
      Home / {{ product.category }} / {{ product.title }}
    </p>

    <div class="grid md:grid-cols-2 gap-8">
      <div>
        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="(img, idx) in product.images.slice(0, 4)"
            :key="idx"
            class="aspect-square rounded-lg overflow-hidden border-2"
            :class="activeImage === img ? 'border-clay' : 'border-transparent'"
            @click="activeImage = img"
          >
            <img :src="img" :alt="`${product.title} view ${idx + 1}`" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <div>
        <h1 class="font-display text-2xl sm:text-3xl font-semibold">{{ product.title }}</h1>
        <p class="text-2xl font-bold text-teal-900 dark:text-cream mt-3">
          Rs {{ product.price.toLocaleString() }}.00
        </p>
        <p class="text-sm text-teal-600 dark:text-teal-300 mt-1">
          3 X {{ Math.round(product.price / 2.51).toLocaleString() }}.00 with KOKO
        </p>
        <p class="mt-4 text-sm leading-relaxed text-teal-800 dark:text-teal-100">
          {{ product.description }}
        </p>
        <p class="mt-4 text-sm font-medium flex items-center gap-2">
          <span class="h-2 w-2 bg-teal-600 rounded-full inline-block"></span> Cash On Delivery available
        </p>

        <div class="flex gap-3 mt-6">
          <button class="btn-primary flex-1" @click="buyNow">Buy It Now</button>
          <button class="btn-outline flex-1" @click="addToCart">Add To Cart</button>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="mt-10 border-t border-teal-900/10 dark:border-cream/10">
      <div class="flex flex-wrap gap-6 border-b border-teal-900/10 dark:border-cream/10 mt-4 text-sm font-medium">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="pb-3 -mb-px border-b-2 capitalize transition"
          :class="activeTab === tab ? 'border-clay text-clay' : 'border-transparent text-teal-600 dark:text-teal-300'"
          @click="activeTab = tab"
        >
          {{ tab === 'additional' ? 'Additional Information' : tab === 'shipping' ? 'Shipping & Delivery' : tab }}
        </button>
      </div>

      <div class="py-6 text-sm leading-relaxed text-teal-800 dark:text-teal-100 max-w-3xl">
        <p v-if="activeTab === 'description'">{{ product.description }}</p>

        <ul v-else-if="activeTab === 'additional'" class="space-y-1 list-disc list-inside">
          <li>Brand: {{ product.brand ?? 'Rishi Fashion' }}</li>
          <li>SKU: {{ product.sku }}</li>
          <li>Weight: {{ product.weight }}g</li>
          <li>Warranty: {{ product.warrantyInformation }}</li>
          <li>Return Policy: {{ product.returnPolicy }}</li>
        </ul>

        <div v-else-if="activeTab === 'reviews'" class="space-y-4">
          <p v-if="product.reviews.length === 0">No reviews yet.</p>
          <div v-for="(review, idx) in product.reviews" :key="idx" class="border-b border-teal-900/10 dark:border-cream/10 pb-3">
            <p class="font-medium">{{ review.reviewerName }} — {{ review.rating }}★</p>
            <p class="text-teal-700 dark:text-teal-200">{{ review.comment }}</p>
          </div>
        </div>

        <ul v-else class="space-y-1 list-disc list-inside">
          <li>{{ product.shippingInformation }}</li>
          <li>Hand-wash in cold water with mild detergent; avoid long soaking (5-15 min).</li>
          <li>Wash new batik separately to check for colour bleed.</li>
          <li>Dry in shade, away from direct sunlight.</li>
          <li>Store folded in muslin/cotton, not plastic.</li>
        </ul>
      </div>
    </div>

    <!-- Related products -->
    <section v-if="related.length" class="mt-10">
      <h2 class="font-display text-xl font-semibold mb-4">Related Product</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <ProductCard v-for="p in related" :key="p.id" :product="p" @add-to-cart="cart.addToCart(p, 1)" />
      </div>
    </section>
  </div>
</template>

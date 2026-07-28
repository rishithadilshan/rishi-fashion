<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const router = useRouter()
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="font-display text-2xl font-semibold mb-6">Your Cart</h1>

    <div v-if="cart.lines.length === 0" class="text-center py-16">
      <p class="text-teal-600 dark:text-teal-300 mb-4">Your cart is empty.</p>
      <RouterLink to="/" class="btn-primary inline-block">Continue Shopping</RouterLink>
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="line in cart.lines"
        :key="line.product.id"
        class="flex gap-4 items-center border-b border-teal-900/10 dark:border-cream/10 pb-4"
      >
        <img :src="line.product.thumbnail" :alt="line.product.title" class="w-20 h-24 object-cover rounded-md" />
        <div class="flex-1">
          <h2 class="font-medium text-sm">{{ line.product.title }}</h2>
          <p class="text-teal-700 dark:text-teal-200 font-semibold">Rs {{ line.product.price.toLocaleString() }}.00</p>
          <div class="flex items-center gap-2 mt-2">
            <button class="w-7 h-7 border rounded-md" @click="cart.updateQuantity(line.product.id, line.quantity - 1)">-</button>
            <span class="w-6 text-center">{{ line.quantity }}</span>
            <button class="w-7 h-7 border rounded-md" @click="cart.updateQuantity(line.product.id, line.quantity + 1)">+</button>
          </div>
        </div>
        <button class="text-clay text-sm hover:underline" @click="cart.removeFromCart(line.product.id)">Remove</button>
      </div>

      <div class="flex justify-between items-center pt-4">
        <div class="text-sm text-teal-700 dark:text-teal-200">
          <p>Subtotal: Rs {{ cart.subtotal.toLocaleString() }}.00</p>
          <p>Shipping: Rs {{ cart.shippingCharge.toLocaleString() }}.00</p>
        </div>
        <p class="text-xl font-bold">Total: Rs {{ cart.total.toLocaleString() }}.00</p>
      </div>

      <button class="btn-primary w-full" @click="router.push('/checkout')">Proceed to Checkout</button>
    </div>
  </div>
</template>

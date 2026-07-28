<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

interface CardForm {
  cardNumber: string
  expiry: string
  cvc: string
  cardHolder: string
  saveInfo: boolean
}

const route = useRoute()
const router = useRouter()
const cart = useCartStore()

const amountDue = ref<number>(cart.total)
const paymentSuccessful = ref<boolean>(false)

const form = reactive<CardForm>({
  cardNumber: '',
  expiry: '',
  cvc: '',
  cardHolder: '',
  saveInfo: false,
})

const isCodOrder = computed<boolean>(() => route.query.success === 'cod')

function confirmPayment(): void {
  paymentSuccessful.value = true
  cart.clearCart()
}

function backToShop(): void {
  router.push('/')
}

onMounted(() => {
  if (isCodOrder.value) {
    paymentSuccessful.value = true
  }
})
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-md rounded-2xl overflow-hidden shadow-xl border border-teal-900/10 relative">
      <div class="bg-teal-400 dark:bg-teal-700 py-6 text-center">
        <h1 class="font-display text-xl font-semibold text-white">Payment Details</h1>
      </div>

      <div class="bg-cream dark:bg-teal-900 p-6 space-y-6">
        <section v-if="!isCodOrder">
          <h2 class="font-semibold mb-3">Credit/Debit Card Details</h2>
          <input v-model="form.cardNumber" placeholder="Card Number" class="input-field" maxlength="19" />
          <div class="grid grid-cols-2 gap-3 mt-3">
            <input v-model="form.expiry" placeholder="DD/MM" class="input-field" maxlength="5" />
            <input v-model="form.cvc" placeholder="CVC" class="input-field" maxlength="4" />
          </div>
          <input v-model="form.cardHolder" placeholder="Cardholder Name" class="input-field mt-3" />
          <label class="flex items-center gap-2 text-sm mt-3">
            <input v-model="form.saveInfo" type="checkbox" class="rounded border-teal-300" />
            Save this information next time
          </label>
        </section>

        <section v-else class="text-center text-sm text-teal-700 dark:text-teal-200">
          Cash on Delivery selected — pay when your order arrives.
        </section>

        <section class="border-t border-teal-900/10 dark:border-cream/10 pt-4">
          <h2 class="font-semibold mb-2">Price</h2>
          <p class="font-bold text-lg">Rs {{ amountDue.toLocaleString() }}.00</p>
        </section>

        <button v-if="!isCodOrder" type="button" class="btn-primary w-full" @click="confirmPayment">Confirm</button>
      </div>

      <!-- Success overlay -->
      <div
        v-if="paymentSuccessful"
        class="absolute inset-0 bg-black/40 flex items-center justify-center p-6"
      >
        <div class="bg-white dark:bg-teal-800 rounded-xl p-6 max-w-xs w-full text-center shadow-2xl">
          <div class="mx-auto h-10 w-10 rounded-full bg-teal-500 text-white flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="font-semibold text-lg">
            {{ isCodOrder ? 'Your order was placed!' : 'Your payment was successful' }}
          </h3>
          <p class="text-sm text-teal-600 dark:text-teal-200 mt-2">
            Thank you for your order, be in contact with more details shortly.
          </p>
          <button class="btn-outline w-full mt-4" @click="backToShop">Back to Shop</button>
        </div>
      </div>
    </div>
  </div>
</template>

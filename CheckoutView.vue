<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

type PaymentMethod = 'webxpay' | 'koko' | 'cod'

interface DeliveryForm {
  firstName: string
  lastName: string
  address: string
  city: string
  province: string
  country: string
  phone: string
  saveInfo: boolean
}

const cart = useCartStore()
const router = useRouter()

const form = reactive<DeliveryForm>({
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  province: '',
  country: '',
  phone: '',
  saveInfo: false,
})

const paymentMethod = ref<PaymentMethod>('cod')

function submitOrder(): void {
  if (cart.lines.length === 0) return
  if (paymentMethod.value === 'cod') {
    cart.clearCart()
    router.push({ path: '/payment', query: { success: 'cod' } })
  } else {
    router.push('/payment')
  }
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-md rounded-2xl overflow-hidden shadow-xl border border-teal-900/10">
      <div class="bg-teal-400 dark:bg-teal-700 py-6 text-center">
        <h1 class="font-display text-xl font-semibold text-white tracking-wide">ORDER PLACE</h1>
      </div>

      <form class="bg-cream dark:bg-teal-900 p-6 space-y-6" @submit.prevent="submitOrder">
        <section>
          <h2 class="font-semibold mb-3">Delivery</h2>
          <div class="grid grid-cols-2 gap-3">
            <input v-model="form.firstName" placeholder="First Name" class="input-field" required />
            <input v-model="form.lastName" placeholder="Last Name" class="input-field" required />
          </div>
          <input v-model="form.address" placeholder="Apartment, Suite, etc" class="input-field mt-3" />
          <div class="grid grid-cols-2 gap-3 mt-3">
            <input v-model="form.city" placeholder="City" class="input-field" required />
            <input v-model="form.province" placeholder="Province" class="input-field" />
          </div>
          <input v-model="form.country" placeholder="Country" class="input-field mt-3" required />
          <input v-model="form.phone" placeholder="Phone" class="input-field mt-3" required />
          <label class="flex items-center gap-2 text-sm mt-3">
            <input v-model="form.saveInfo" type="checkbox" class="rounded border-teal-300" />
            Save this information next time
          </label>
        </section>

        <section class="border-t border-teal-900/10 dark:border-cream/10 pt-4">
          <h2 class="font-semibold mb-2">Price</h2>
          <div class="text-sm space-y-1">
            <div class="flex justify-between">
              <span>Item Price ({{ cart.itemCount }} items)</span>
              <span class="font-semibold">Rs {{ cart.subtotal.toLocaleString() }}.00</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping Charge</span>
              <span class="font-semibold">Rs {{ cart.shippingCharge.toLocaleString() }}.00</span>
            </div>
          </div>
          <div class="bg-gold/90 text-white font-semibold rounded-md px-3 py-2 mt-3 inline-block">
            Total Price: Rs {{ cart.total.toLocaleString() }}.00
          </div>
        </section>

        <section class="border-t border-teal-900/10 dark:border-cream/10 pt-4">
          <h2 class="font-semibold mb-2">Payment</h2>
          <div class="space-y-2 text-sm">
            <label class="flex items-center gap-2">
              <input v-model="paymentMethod" type="radio" value="webxpay" name="payment" />
              WEBXPAY
            </label>
            <label class="flex items-center gap-2">
              <input v-model="paymentMethod" type="radio" value="koko" name="payment" />
              KOKO Pay
            </label>
            <label class="flex items-center gap-2">
              <input v-model="paymentMethod" type="radio" value="cod" name="payment" />
              Cash On Delivery
            </label>
          </div>
        </section>

        <button type="submit" class="btn-primary w-full" :disabled="cart.lines.length === 0">Pay Now</button>
      </form>
    </div>
  </div>
</template>

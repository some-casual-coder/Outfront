<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { productsStore } from './stores/products';

  const router = useRouter()

  const store = productsStore()

</script>

<template>
  <header>
    <div class="cart-items" @click="router.push({ name: 'CartView' })">
      <p>Items in Cart: {{store.cart.length }}</p>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>

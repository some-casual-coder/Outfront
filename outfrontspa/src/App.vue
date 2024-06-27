<script setup>
import { useRoute, useRouter } from 'vue-router';
import { productsStore } from './stores/products';

const router = useRouter()

const store = productsStore()

store.loadCartFromStorage()

</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>

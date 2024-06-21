import { createRouter, createWebHistory } from 'vue-router';
import Catalog from '@/views/catalog.vue';
import ProductDetail from '@/views/ProductDetail.vue'; 
import Cart from '@/views/Cart.vue'; 
import Home from '@/views/Home.vue';
import ComingSoon from '@/views/ComingSoon.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path: '/shop',
      name: 'shop',
      component: Catalog
    },

    {
      path: '/product/:id',
      name: 'ProductView',
      component: ProductDetail
    },

    {
      path: '/cart',
      name: 'CartView',
      component: Cart
    },

    {
      path: '/coming_soon',
      name: 'ComingSoon',
      component: ComingSoon
    }
  ]
})

export default router

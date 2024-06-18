import { createRouter, createWebHistory } from 'vue-router';
import Catalog from '@/views/catalog.vue';
import ProductDetail from '@/views/ProductDetail.vue'; 
import Cart from '@/views/Cart.vue'; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    }
  ]
})

export default router

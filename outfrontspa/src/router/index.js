import { createRouter, createWebHistory } from 'vue-router';
import Catalog from '@/views/catalog.vue';
import ProductDetail from '@/views/ProductDetail.vue';
import Cart from '@/views/Cart.vue';
import Home from '@/views/Home.vue';
import Checkout from '@/views/Checkout.vue';
import ComingSoon from '@/views/ComingSoon.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { title: "Home" }
    },

    {
      path: '/shop',
      name: 'shop',
      component: Catalog,
      meta: { title: "Shop" }
    },

    {
      path: '/product/:id',
      name: 'ProductView',
      component: ProductDetail,
      meta: { title: "Product Details" }
    },

    {
      path: '/cart',
      name: 'CartView',
      component: Cart,
      meta: { title: "Cart" }
    },

    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout,
      meta: { title: "Checkout" }
    },

    {
      path: '/coming_soon',
      name: 'ComingSoon',
      component: ComingSoon,
      meta: { title: "Coming Soon" }
    }
  ]
})

router.beforeResolve((to, from, next) => {
  document.title = to.meta.title || "Outfront Spa";
  next();
});

export default router

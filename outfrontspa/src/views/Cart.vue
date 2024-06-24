<template>
    <button @click="router.push({ name: 'shop' })">Continue shopping</button>
    <div v-if="!store.cart.length">
        <h1>Empty Cart</h1>
    </div>
    <div class="cart-items" v-else>
        <div class="cart-item" v-for="item in store.cart" :key="item.id">
            <div class="item-details">
                <img :src="item.thumbnail" alt="">
                <span>Brand {{ item.title }}</span>
                <span>Category {{ item.category }}</span>
                <span>quantity {{ item.quantity  }}</span>
                <span>Price Kes{{ item.price }}</span>
                <button @click="removeFromCart(item.id)">Remove</button>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CartView'
})

</script>

<script setup>
import { productsStore } from '@/stores/products';
import { useRoute, useRouter } from 'vue-router';

const store = productsStore();
const router = useRouter();

const removeFromCart = (id) => {
    store.removeFromCart(id);
}
</script>